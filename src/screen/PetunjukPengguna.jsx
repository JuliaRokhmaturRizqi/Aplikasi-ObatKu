// src/screen/PetunjukPengguna.jsx
import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StepItem = ({ number, title, description, icon }) => (
  <View style={styles.stepCard}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={30} color="#fff" />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.stepTitle}>Langkah {number}: {title}</Text>
      <Text style={styles.stepDesc}>{description}</Text>
    </View>
  </View>
);

export default function PetunjukPengguna({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>


      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>Panduan mudah berbelanja di ObatKU:</Text>

        <StepItem 
          number="1" 
          title="Cari Produk" 
          description="Gunakan kolom pencarian atau jelajahi kategori untuk menemukan obat atau vitamin yang Anda butuhkan."
          icon="search-outline"
        />
        <StepItem 
          number="2" 
          title="Pilih & Detail" 
          description="Klik produk untuk melihat detail, dosis, dan ulasan pembeli lain."
          icon="eye-outline"
        />
        <StepItem 
          number="3" 
          title="Masukkan Keranjang" 
          description="Klik tombol 'Beli' atau ikon keranjang untuk menambahkan barang belanjaan."
          icon="cart-outline"
        />
        <StepItem 
          number="4" 
          title="Pembayaran" 
          description="Lakukan pembayaran melalui transfer bank atau e-wallet yang tersedia."
          icon="card-outline"
        />
        <StepItem 
          number="5" 
          title="Pengiriman" 
          description="Pantau status pengiriman Anda melalui menu Dashboard atau Profil."
          icon="bicycle-outline"
        />
        
        <View style={{height: 40}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, color: '#333' },
  content: { padding: 20 },
  intro: { fontSize: 16, color: '#666', marginBottom: 20 },
  stepCard: { 
    flexDirection: 'row', backgroundColor: '#f9f9f9', borderRadius: 12, padding: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#eee'
  },
  iconContainer: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: '#001cab',
    justifyContent: 'center', alignItems: 'center', marginRight: 15
  },
  textContainer: { flex: 1, justifyContent: 'center' },
  stepTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  stepDesc: { fontSize: 13, color: '#666', lineHeight: 18 },
});