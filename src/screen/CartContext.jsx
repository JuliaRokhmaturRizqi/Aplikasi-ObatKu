import React, { createContext, useState, useMemo } from "react";
import { Alert } from "react-native";

// 1. Buat Context
export const CartContext = createContext(null);

/* 
  Data awal keranjang, bisa dikosongkan jika ingin memulai dari nol.
  Saya akan membiarkannya agar layar Keranjang tidak kosong saat pertama kali dibuka.
*/
const INIT_CART = [
  {
    sellerId: "s1",
    sellerName: "Tokoplus ID",
    items: [
      {
        id: "p1",
        name: "Paracetamol 500mg",
        variant: "Pack 10",
        price: 12000,
        qty: 1,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=60",
        checked: true,
      },
    ],
  },
  {
    sellerId: "s2",
    sellerName: "Mamimoe.Inc",
    items: [
      {
        id: "p2",
        name: "Mini Sunflower Premium",
        variant: "Sunflower",
        price: 23750,
        qty: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=60",
        checked: false,
      },
    ],
  },
];

// 2. Buat Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(INIT_CART);

  // Fungsi untuk menambah produk ke keranjang
  const addToCart = (product) => {
    // Asumsi: Setiap produk punya seller. Kita buat seller dummy jika tidak ada.
    const sellerId = product.sellerId || "s2"; // Default ke Mamimoe.Inc jika tidak ada
    const sellerName = product.sellerName || "Mamimoe.Inc";

    setCart((prevCart) => {
      const newCart = [...prevCart];
      let seller = newCart.find((s) => s.sellerId === sellerId);

      // Jika seller sudah ada di keranjang
      if (seller) {
        const itemIndex = seller.items.findIndex((it) => it.id === product.id);
        // Jika produk sudah ada, tambah kuantitasnya
        if (itemIndex > -1) {
          seller.items[itemIndex].qty += 1;
        } else {
          // Jika produk belum ada, tambahkan ke daftar item seller
          seller.items.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace(/[^0-9]/g, '')), // Konversi 'Rp 12.000' ke 12000
            qty: 1,
            image: product.image,
            checked: false, // Default tidak dicentang
            variant: "Default", // Varian default
          });
        }
      } else {
        // Jika seller belum ada, buat entri seller baru
        newCart.push({
          sellerId: sellerId,
          sellerName: sellerName,
          items: [{
            id: product.id,
            name: product.name,
            price: parseFloat(product.price.replace(/[^0-9]/g, '')),
            qty: 1,
            image: product.image,
            checked: false,
            variant: "Default",
          }],
        });
      }
      return newCart;
    });

    Alert.alert("Sukses", `${product.name} berhasil ditambahkan ke keranjang.`);
  };

  // Memoize value untuk mencegah re-render yang tidak perlu
  const value = useMemo(
    () => ({
      cart,
      setCart,
      addToCart,
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};