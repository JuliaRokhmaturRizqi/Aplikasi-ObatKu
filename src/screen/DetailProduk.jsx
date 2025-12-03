// src/screen/DetailProduk.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Data Dummy Komentar
const REVIEWS = [
  { id: 1, user: "Budi Santoso", rating: 5, comment: "Barang original, pengiriman cepat!", date: "20 Nov 2025" },
  { id: 2, user: "Siti Aminah", rating: 4, comment: "Packing aman, tapi kurir agak lama.", date: "19 Nov 2025" },
  { id: 3, user: "Rudi Hartono", rating: 5, comment: "Sangat ampuh, terima kasih ObatKU.", date: "18 Nov 2025" },
];

export default function DetailProduk({ route, navigation }) {
  // Ambil product dari route params (jika tidak ada, buat fallback sederhana)
  const product = route?.params?.product ?? {
    name: "Produk tidak ditemukan",
    desc: "-",
    price: "-",
    image: null,
    rating: 0,
    sellerName: "Toko Tidak Diketahui",
  };

  const handleVisitSeller = () => {
    // Kalau punya halaman seller: navigation.navigate('Seller', { sellerName: product.sellerName })
    Alert.alert("Toko", `Buka halaman toko: ${product.sellerName}`);
  };

  const handleAddToCart = () => {
    // Sementara: alert. Nanti bisa implement add-to-cart nyata (Context / Redux / AsyncStorage, dll.)
    Alert.alert("Keranjang", `${product.name} ditambahkan ke keranjang.`);
  };

  const handleBuyNow = () => {
    // Sementara: alert. Nanti bisa diarahkan ke flow checkout.
    Alert.alert("Checkout", `Lanjut ke pembayaran untuk: ${product.name}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* --- Header Gambar --- */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} />
          ) : (
            <View style={[styles.image, { alignItems: "center", justifyContent: "center" }]}>
              <Ionicons name="image-outline" size={72} color="#ddd" />
            </View>
          )}

          {/* Tombol Kembali */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#001cab" />
          </TouchableOpacity>
        </View>

        {/* --- Info Produk --- */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>

              {/* sellerName (Toko) */}
              {product.sellerName ? (
                <TouchableOpacity onPress={handleVisitSeller} activeOpacity={0.8} style={styles.sellerRow}>
                  <View style={styles.sellerDot} />
                  <Text style={styles.sellerName}>{product.sellerName}</Text>
                  <Ionicons name="chevron-forward" size={14} color="#0071b7" style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              ) : (
                <Text style={styles.category}>Kategori: Kesehatan</Text>
              )}
            </View>

            <Text style={styles.price}>{product.price}</Text>
          </View>

          {/* Rating Utama */}
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating} (120 Ulasan)</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.description}>
            {product.desc}. Produk ini sangat direkomendasikan untuk menjaga kesehatan Anda.
            Pastikan membaca aturan pakai sebelum mengonsumsi. Simpan di tempat yang sejuk dan terhindar dari sinar matahari langsung.
          </Text>

          <View style={styles.divider} />

          {/* --- Bagian Ulasan/Komentar --- */}
          <Text style={styles.sectionTitle}>Ulasan Pembeli</Text>
          {REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>

              <View style={{ flexDirection: "row", marginBottom: 6 }}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name={i < review.rating ? "star" : "star-outline"} size={12} color="#FFD700" />
                ))}
              </View>

              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}

          {/* Spacer agar konten tidak tertutup tombol bawah */}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>

      {/* --- Bottom Action Bar (Sticky) --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={22} color="#001cab" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButtonWrapper} onPress={handleBuyNow}>
          <LinearGradient
            colors={["#001cab", "#0bb3e1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buyButtonGradient}
          >
            <Text style={styles.buyButtonText}>Beli Sekarang</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: "#f0f0f0",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 20,
    left: 16,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: "#fff",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#071233",
    marginBottom: 6,
  },

  /* seller row */
  sellerRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  sellerDot: { width: 8, height: 8, borderRadius: 6, backgroundColor: "#0071b7", marginRight: 8 },
  sellerName: { color: "#0071b7", fontWeight: "700" },

  category: {
    fontSize: 12,
    color: "#888",
  },
  price: {
    fontSize: 20,
    fontWeight: "900",
    color: "#001cab",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 8,
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071233",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },

  // Review Styles
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  reviewUser: {
    fontWeight: "700",
    fontSize: 13,
    color: "#071233",
  },
  reviewDate: {
    fontSize: 11,
    color: "#999",
  },
  reviewComment: {
    fontSize: 13,
    color: "#555",
  },

  // Bottom Bar
  bottomBar: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 10 : 18,
    left: 12,
    right: 12,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
  },

  cartButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#dfefff",
    borderRadius: 12,
    marginRight: 12,
    backgroundColor: "#fff",
  },

  buyButtonWrapper: {
    flex: 1,
  },
  buyButtonGradient: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 16,
  },
});
