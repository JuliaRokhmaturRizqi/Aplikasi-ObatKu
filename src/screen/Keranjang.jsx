// src/screen/Keranjang.jsx
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

/* ---------- Mock cart data (grouped by seller) ---------- */
const INIT_CART = [
  {
    sellerId: "s1",
    sellerName: "Tokoplus ID",
    freeShippingProgress: 0.75, // contoh progress bar
    items: [
      {
        id: "p1",
        name: "Paracetamol 500mg",
        variant: "Pack 10",
        price: 12000,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=60",
        checked: true,
      },
    ],
  },
  {
    sellerId: "s2",
    sellerName: "Mamimoe.Inc",
    freeShippingProgress: 0.15,
    items: [
      {
        id: "p2",
        name: "Mini Sunflower Premium",
        variant: "Sunflower",
        price: 23750,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=60",
        checked: false,
      },
      {
        id: "p3",
        name: "Red Bouquet Exclusive",
        variant: "Default",
        price: 30450,
        qty: 1,
        image:
          "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=500&q=60",
        checked: false,
      },
    ],
  },
];

/* ---------- Utilities ---------- */
const currency = (v) =>
  typeof v === "number" ? `Rp ${v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}` : v;

/* ---------- Keranjang Screen ---------- */
export default function Keranjang({ navigation }) {
  const [cart, setCart] = useState(INIT_CART);

  // Toggle an item checked
  const toggleItem = (sellerId, itemId) => {
    setCart((prev) =>
      prev.map((s) =>
        s.sellerId !== sellerId
          ? s
          : { ...s, items: s.items.map((it) => (it.id === itemId ? { ...it, checked: !it.checked } : it)) }
      )
    );
  };

  // Toggle all items in seller
  const toggleSeller = (sellerId) => {
    setCart((prev) =>
      prev.map((s) =>
        s.sellerId !== sellerId
          ? s
          : { ...s, items: s.items.map((it) => ({ ...it, checked: !s.items.every((i) => i.checked) })) }
      )
    );
  };

  // Change qty
  const changeQty = (sellerId, itemId, delta) => {
    setCart((prev) =>
      prev.map((s) =>
        s.sellerId !== sellerId
          ? s
          : {
              ...s,
              items: s.items.map((it) =>
                it.id === itemId ? { ...it, qty: Math.max(1, it.qty + delta) } : it
              ),
            }
      )
    );
  };

  // Remove item
  const removeItem = (sellerId, itemId) => {
    Alert.alert("Hapus produk", "Yakin ingin menghapus produk dari keranjang?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () =>
          setCart((prev) =>
            prev
              .map((s) => (s.sellerId !== sellerId ? s : { ...s, items: s.items.filter((it) => it.id !== itemId) }))
              .filter((s) => s.items.length > 0)
          ),
      },
    ]);
  };

  // Calculate totals
  const totals = useMemo(() => {
    let subtotal = 0;
    let itemCount = 0;
    cart.forEach((seller) =>
      seller.items.forEach((it) => {
        if (it.checked) {
          subtotal += it.price * it.qty;
          itemCount += it.qty;
        }
      })
    );
    return { subtotal, itemCount };
  }, [cart]);

  const handleCheckout = () => {
    if (totals.itemCount === 0) {
      Alert.alert("Keranjang kosong", "Pilih minimal 1 produk untuk melanjutkan checkout.");
      return;
    }
    // lanjut ke proses checkout — contoh navigation
    navigation.navigate?.("Checkout", { subtotal: totals.subtotal });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        

        {cart.map((seller) => (
          <View key={seller.sellerId} style={styles.sellerBlock}>
            <View style={styles.sellerHeader}>
              <TouchableOpacity onPress={() => toggleSeller(seller.sellerId)} style={styles.sellerLeft}>
                <Ionicons
                  name={seller.items.every((i) => i.checked) ? "checkbox" : "square-outline"}
                  size={20}
                  color="#001cab"
                />
                <Text style={styles.sellerName}>{seller.sellerName}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert("Ubah", "Fungsi Ubah toko (placeholder).")}>
                <Text style={styles.sellerAction}>Ubah</Text>
              </TouchableOpacity>
            </View>

            {/* free shipping hint */}
            <View style={styles.shippingHintWrap}>
              <View style={styles.shippingIcon}>
                <Ionicons name="car-outline" size={16} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.shippingText}>Kamu telah menikmati Gratis Ongkir!</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressInner, { width: `${Math.min(100, seller.freeShippingProgress * 100)}%` }]} />
                </View>
              </View>
            </View>

            {/* items */}
            {seller.items.map((it) => (
              <View key={it.id} style={styles.itemRow}>
                <TouchableOpacity onPress={() => toggleItem(seller.sellerId, it.id)} style={styles.checkboxWrap}>
                  <Ionicons name={it.checked ? "checkbox" : "square-outline"} size={22} color="#001cab" />
                </TouchableOpacity>

                <Image source={{ uri: it.image }} style={styles.itemImage} />

                <View style={styles.itemBody}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {it.name}
                  </Text>

                  <View style={styles.variantRow}>
                    <View style={styles.variantBadge}>
                      <Text style={styles.variantText}>{it.variant}</Text>
                    </View>

                    <TouchableOpacity onPress={() => Alert.alert("Ubah varian", "Fungsi pilihan varian (placeholder).")}>
                      <Text style={styles.changeText}>Ubah</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.bottomRow}>
                    <Text style={styles.price}>{currency(it.price)}</Text>

                    <View style={styles.qtyWrap}>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(seller.sellerId, it.id, -1)}>
                        <Text style={styles.qtyText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyNumber}>{it.qty}</Text>
                      <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(seller.sellerId, it.id, +1)}>
                        <Text style={styles.qtyText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity onPress={() => removeItem(seller.sellerId, it.id)}>
                      <Text style={styles.removeText}>Hapus</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Alert.alert("Pindah ke simpanan", "Fungsi simpan nanti.")}>
                      <Text style={styles.saveText}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            {/* seller subtotal / hint */}
            <View style={styles.sellerFooter}>
              <Text style={styles.sellerSubtotalLabel}>Subtotal toko</Text>
              <Text style={styles.sellerSubtotalValue}>
                {currency(
                  seller.items.reduce((s, it) => s + (it.checked ? it.price * it.qty : 0), 0)
                )}
              </Text>
            </View>
          </View>
        ))}

      </ScrollView>

      {/* Footer bar (fixed) */}
      <View style={styles.footer}>
        <View style={styles.footerLeft}>
          <TouchableOpacity onPress={() => {
            // toggle all
            const allChecked = cart.every(s => s.items.every(i => i.checked));
            setCart(prev => prev.map(s => ({ ...s, items: s.items.map(it => ({ ...it, checked: !allChecked })) })));
          }} style={styles.selectAll}>
            <Ionicons name={cart.every(s => s.items.every(i => i.checked)) ? "checkbox" : "square-outline"} size={20} color="#001cab" />
            <Text style={styles.selectAllText}>Semua</Text>
          </TouchableOpacity>

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.totalLabel}>Gratis | <Text style={styles.totalPrice}>{currency(totals.subtotal)}</Text></Text>
            <Text style={styles.savingText}>Hemat Rp{ ((totals.subtotal * 0.05) | 0).toLocaleString('id-ID') }</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleCheckout}>
          <Text style={styles.checkoutText}>Checkout ({totals.itemCount})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  container: { padding: 16 },
  pageTitle: { fontSize: 18, fontWeight: "800", color: "#071233", marginBottom: 12 },

  sellerBlock: { backgroundColor: "#fff", borderRadius: 12, paddingBottom: 12, marginBottom: 14, overflow: "hidden", elevation: 2 },
  sellerHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottomWidth: 1, borderBottomColor: "#f2f4f7" },
  sellerLeft: { flexDirection: "row", alignItems: "center" },
  sellerName: { marginLeft: 8, fontWeight: "800", color: "#001cab" },
  sellerAction: { color: "#666", fontWeight: "700" },

  shippingHintWrap: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#f3fbf9" },
  shippingIcon: { width: 34, height: 34, borderRadius: 8, backgroundColor: "#00a86b", alignItems: "center", justifyContent: "center", marginRight: 10 },
  shippingText: { color: "#064e3b", fontWeight: "700", marginBottom: 6 },
  progressBar: { height: 6, backgroundColor: "#e9f5ee", borderRadius: 6, overflow: "hidden" },
  progressInner: { height: 6, backgroundColor: "#00a86b" },

  itemRow: { flexDirection: "row", padding: 12, alignItems: "flex-start" },
  checkboxWrap: { marginRight: 8, marginTop: 6 },
  itemImage: { width: 78, height: 78, borderRadius: 8, backgroundColor: "#f2f4f7", marginRight: 12 },
  itemBody: { flex: 1 },
  itemName: { fontWeight: "800", color: "#001cab", marginBottom: 6 },

  variantRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  variantBadge: { backgroundColor: "#f2f6ff", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  variantText: { color: "#001cab", fontWeight: "700", fontSize: 12 },
  changeText: { color: "#6b7280", fontSize: 12 },

  bottomRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  price: { color: "#005435ff", fontWeight: "900" },
  qtyWrap: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#eef2f7" },
  qtyBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  qtyText: { color: "#001cab", fontWeight: "900" },
  qtyNumber: { paddingHorizontal: 8, fontWeight: "800", color: "#071233" },

  itemActions: { flexDirection: "row", marginTop: 8 },
  removeText: { color: "#001cab", marginRight: 16, fontWeight: "700" },
  saveText: { color: "#6b7280", fontWeight: "700" },

  sellerFooter: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12, paddingTop: 6, borderTopWidth: 1, borderTopColor: "#f2f4f7" },
  sellerSubtotalLabel: { color: "#666" },
  sellerSubtotalValue: { fontWeight: "900", color: "#001cab" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.OS === "android" ? 6 : 12,
    backgroundColor: "#fff",
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
  },
  footerLeft: { flexDirection: "row", alignItems: "center" },
  selectAll: { flexDirection: "row", alignItems: "center" },
  selectAllText: { marginLeft: 6, fontWeight: "700", color: "#333" },
  totalLabel: { color: "#6b7280" },
  totalPrice: { color: "#001cab", fontWeight: "900" },
  savingText: { fontSize: 12, color: "#001cab" },

  checkoutBtn: {
    backgroundColor: "#001cab",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: { color: "#fff", fontWeight: "900" },
});
