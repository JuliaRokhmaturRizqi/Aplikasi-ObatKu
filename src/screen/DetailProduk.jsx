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

// Data Dummy Komentar
const REVIEWS = [
  { id: 1, user: "Budi Santoso", rating: 5, comment: "Barang original, pengiriman cepat!", date: "20 Nov 2025" },
  { id: 2, user: "Siti Aminah", rating: 4, comment: "Packing aman, tapi kurir agak lama.", date: "19 Nov 2025" },
  { id: 3, user: "Rudi Hartono", rating: 5, comment: "Sangat ampuh, terima kasih ObatKU.", date: "18 Nov 2025" },
];

export default function DetailProduk({ route, navigation }) {
  // Mengambil data produk yang dikirim dari Home
  const { product } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- Header Gambar --- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {/* Tombol Kembali */}
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#001cab" />
          </TouchableOpacity>
        </View>

        {/* --- Info Produk --- */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={{flex: 1}}>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.category}>Kategori: Kesehatan</Text>
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
              <View style={{flexDirection: 'row', marginBottom: 5}}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons 
                    key={i} 
                    name={i < review.rating ? "star" : "star-outline"} 
                    size={12} 
                    color="#FFD700" 
                  />
                ))}
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
          
          {/* Spacer agar konten tidak tertutup tombol bawah */}
          <View style={{height: 100}} />
        </View>
      </ScrollView>

      {/* --- Bottom Action Bar (Sticky) --- */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.cartButton}
          onPress={() => Alert.alert("Sukses", "Masuk Keranjang!")}
        >
          <Ionicons name="cart-outline" size={24} color="#001cab" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.buyButtonWrapper}
          onPress={() => Alert.alert("Checkout", "Melanjutkan ke pembayaran...")}
        >
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

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    width: width,
    height: 300,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 8,
    borderRadius: 20,
  },
  infoContainer: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#001cab',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    color: '#666',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  // Review Styles
  reviewCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#333',
  },
  reviewDate: {
    fontSize: 11,
    color: '#999',
  },
  reviewComment: {
    fontSize: 13,
    color: '#555',
  },
  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  cartButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#001cab',
    borderRadius: 12,
    marginRight: 15,
  },
  buyButtonWrapper: {
    flex: 1,
  },
  buyButtonGradient: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});