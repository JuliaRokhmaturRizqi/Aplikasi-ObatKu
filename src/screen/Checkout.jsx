import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,    // Import Alert
  Platform, // <-- 1. IMPORT PLATFORM UNTUK CEK ANDROID/IOS/WEB
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

export default function Checkout({ navigation }) {
  const { totals, currency, checkedItems } = useCart();

  // --- LOGIKA PESANAN (FIXED) ---
  const handleBuatPesanan = () => {
    console.log("Tombol ditekan!"); // Cek di terminal/console browser

    const title = "Pesanan Berhasil! 🎉";
    const msg = "Terima kasih telah berbelanja. Mohon tunggu, kurir akan segera mengantar pesanan ke lokasi Anda.";

    // 2. LOGIKA KHUSUS WEB
    if (Platform.OS === "web") {
      // Di Web, Alert.alert tidak muncul sebagai pop-up native
      const userConfirmed = window.confirm(`${title}\n\n${msg}`);
      if (userConfirmed) {
        // Navigasi setelah klik OK di browser
        if (navigation.canGoBack()) {
          navigation.popToTop();
        } else {
          navigation.navigate("Home"); 
        }
      }
    } 
    // 3. LOGIKA KHUSUS ANDROID / IOS
    else {
      Alert.alert(
        title,
        msg,
        [
          {
            text: "OK, Terima Kasih",
            onPress: () => {
              // Reset navigasi ke halaman awal
              // Gunakan try-catch agar tidak crash
              try {
                navigation.popToTop();
              } catch (e) {
                console.log("Navigasi fallback", e);
                navigation.navigate("Home"); // Ganti 'Home' atau 'Dashboard' sesuai nama route awal Anda
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ALAMAT */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="location-outline" size={20} color="#001cab" />
            <Text style={styles.cardTitle}> Julia (+62) 812-8217-6578</Text>
          </View>
          <Text style={styles.address}>
            RT.4/RW.3, Gantiwarno, Belitang{"\n"}
            Kab. OKU Timur, Sumatera Selatan 32385
          </Text>
        </View>

        {/* LIST PRODUK */}
        <View style={styles.card}>
          <Text style={styles.storeName}>Toko ObatKU</Text>

          {checkedItems.map((product) => (
            <View key={product.id} style={styles.productRow}>
              <Image
                source={{ uri: product.image }}
                style={styles.productImage}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.price}>
                  {currency(product.priceNumber)}
                </Text>
              </View>

              <Text style={styles.qty}>x{product.qty}</Text>
            </View>
          ))}
        </View>

        {/* OPSI */}
        <View style={styles.card}>
          <Row label="Voucher Toko" />
          <Row label="Pesan untuk Penjual" />
          <Row label="Opsi Pengiriman" value="Hemat Ongkir" />
        </View>

        {/* METODE PEMBAYARAN */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          <View style={styles.paymentItemActive}>
            <Text style={styles.paymentText}>COD - Bayar di Tempat</Text>
            <Ionicons name="checkmark-circle" size={20} color="#0bb3e1" />
          </View>

          <View style={styles.paymentItem}>
            <Text style={styles.paymentText}>Saldo E-Wallet</Text>
          </View>
        </View>

        {/* RINCIAN */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>

          <SummaryRow label="Subtotal Produk" value={currency(totals.subtotal)} />
          <SummaryRow label="Biaya Pengiriman" value="Rp 13.000" />
          <SummaryRow label="Diskon Ongkir" value="-Rp 13.000" />
          <SummaryRow label="Biaya Layanan" value="Rp 2.000" />

          <View style={styles.divider} />

          <SummaryRow
            label="Total Pembayaran"
            value={currency(totals.subtotal + 2000)}
            bold
          />
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerLabel}>Total</Text>
          <Text style={styles.footerPrice}>
            {currency(totals.subtotal + 2000)}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.orderButton} 
          onPress={handleBuatPesanan}
          activeOpacity={0.7}
        >
          <Text style={styles.orderText}>Buat Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ===== KOMPONEN KECIL ===== */

const Row = ({ label, value = "Pilih" }) => (
  <TouchableOpacity style={styles.rowBetween}>
    <Text style={styles.rowLabel}>{label}</Text>
    <Text style={styles.rowValue}>{value}</Text>
  </TouchableOpacity>
);

const SummaryRow = ({ label, value, bold }) => (
  <View style={styles.rowBetween}>
    <Text style={[styles.summaryLabel, bold && { fontWeight: "700" }]}>
      {label}
    </Text>
    <Text style={[styles.summaryValue, bold && { fontWeight: "700" }]}>
      {value}
    </Text>
  </View>
);

/* ===== STYLE ===== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#001cab",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    color: "#ffffff",
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 14,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitle: {
    fontWeight: "700",
    color: "#111827",
  },

  address: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 13,
  },

  storeName: {
    fontWeight: "700",
    marginBottom: 10,
  },

  productRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    marginRight: 12,
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
  },

  price: {
    color: "#001cab",
    marginTop: 4,
    fontWeight: "700",
  },

  qty: {
    color: "#6b7280",
  },

  sectionTitle: {
    fontWeight: "700",
    marginBottom: 10,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  rowLabel: {
    color: "#111827",
  },

  rowValue: {
    color: "#0bb3e1",
  },

  paymentItem: {
    paddingVertical: 10,
  },

  paymentItemActive: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  paymentText: {
    fontWeight: "600",
  },

  summaryLabel: {
    color: "#374151",
  },

  summaryValue: {
    color: "#111827",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 8,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
  },

  footerLabel: {
    color: "#6b7280",
  },

  footerPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#001cab",
  },

  orderButton: {
    backgroundColor: "#001cab",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  orderText: {
    color: "#ffffff",
    fontWeight: "700",
  },
});