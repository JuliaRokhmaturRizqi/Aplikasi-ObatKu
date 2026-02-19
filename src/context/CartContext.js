import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  /* =============================
     DERIVED / COMPUTED STATE
     ============================= */

  const checkedItems = useMemo(
    () => cart.filter((item) => item.checked),
    [cart]
  );

  const totals = useMemo(() => {
    const subtotal = checkedItems.reduce(
      (sum, item) => sum + item.priceNumber * item.qty,
      0
    );

    const itemCount = checkedItems.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    return { subtotal, itemCount };
  }, [checkedItems]);

  const currency = (n) =>
    "Rp " + Number(n || 0).toLocaleString("id-ID");

  /* =============================
     ACTIONS (sudah ada di kamu)
     ============================= */
  const toggleItem = (id) => {
    setCart((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, checked: !it.checked } : it
      )
    );
  };

  const toggleAll = () => {
    const allChecked = cart.every((c) => c.checked);
    setCart((prev) =>
      prev.map((it) => ({ ...it, checked: !allChecked }))
    );
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev.map((it) =>
        it.id === id
          ? { ...it, qty: Math.max(1, it.qty + delta) }
          : it
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const addToCart = (product, { qty = 1 } = {}) => {
    setCart((prev) => {
      // Cek apakah produk sudah ada di keranjang
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        // Jika ada, update quantity
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          qty: newCart[existingIndex].qty + qty,
        };
        return newCart;
      } else {
        // Jika baru, tambahkan ke array & parse harga ke number
        const priceString = String(product.price || "0");
        const priceNumber = parseInt(priceString.replace(/[^0-9]/g, ""), 10) || 0;

        return [...prev, { ...product, qty, checked: true, priceNumber }];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        checkedItems,
        totals,
        currency,
        toggleItem,
        toggleAll,
        changeQty,
        removeFromCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
