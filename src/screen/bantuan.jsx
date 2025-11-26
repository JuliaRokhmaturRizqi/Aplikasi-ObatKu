// src/screen/bantuan.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // <-- 1. IMPORT LinearGradient

/* Komponen kecil khusus untuk FAQ.
   (Tidak ada perubahan di sini, ini sudah benar)
*/
const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity
        style={styles.faqQuestionRow}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Ionicons
          name={expanded ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color="#001cab"
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.faqAnswer}>
          <Text style={styles.faqAnswerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

// --- Komponen Halaman Utama ---
export default function halamanBantuan({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- BARU: Background Gradasi --- */}
      <LinearGradient
        colors={["#001cab", "#0bb3e1"]} // Gradasi biru khas Anda
        style={styles.gradientBackground}
      />
      {/* ------------------------------- */}

      {/* 1. Header Kustom (Warna teks diubah) */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          {/* <-- UBAH: Warna ikon jadi putih */}
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        {/* Style headerTitle akan diubah di StyleSheet */}
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* 2. Daftar FAQ (Background diubah) */}
      <ScrollView style={styles.container}>
        {/* Style subHeader akan diubah di StyleSheet */}
        <Text style={styles.subHeader}>Pertanyaan Populer (FAQ)</Text>

        {/* Semua FaqItem (kartu putih) akan "mengambang" di atas gradasi */}
        <FaqItem
          question="Bagaimana cara memesan obat?"
          answer="Anda dapat mencari obat melalui kolom pencarian di halaman Home, memilih produk, menambahkannya ke keranjang, dan melanjutkan ke checkout."
        />
        <FaqItem
          question="Apakah saya bisa mengunggah resep dokter?"
          answer="Fitur unggah resep saat ini sedang dalam pengembangan dan akan segera tersedia. Untuk saat ini, kami hanya melayani obat bebas dan bebas terbatas."
        />
        <FaqItem
          question="Bagaimana cara melacak pesanan saya?"
          answer="Anda dapat melihat status pesanan Anda di halaman 'Riwayat Pesanan' yang ada di profil Anda."
        />
        <FaqItem
          question="Metode pembayaran apa saja yang tersedia?"
          answer="Kami menerima pembayaran melalui transfer bank, e-wallet (GoPay, OVO, Dana), dan kartu kredit (Visa, Mastercard)."
        />

        {/* 3. Kontak Lain (Kartu putih) */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Butuh Bantuan Lain?</Text>
          <Text style={styles.contactText}>
            Jika Anda tidak menemukan jawaban, silakan hubungi tim Customer
            Service kami.
          </Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() => Alert.alert("Hubungi CS", "Fitur ini akan membuka WhatsApp/Email.")}
          >
            <Text style={styles.contactButtonText}>Hubungi Kami</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================
// =     STYLESHEET (Diperbarui)     =
// ===================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent", // <-- UBAH: Agar gradasi terlihat
  },
  // --- BARU: Style untuk Gradasi ---
  gradientBackground: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%", // Memenuhi seluruh layar
  },
  // --- Header ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "android" ? 30 : 20,
    paddingBottom: 15,
    backgroundColor: "transparent", // <-- UBAH: Agar gradasi terlihat
    borderBottomWidth: 1,
    borderBottomColor: "transparent", // <-- UBAH: Hapus garis
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // <-- UBAH: Warna teks jadi putih
  },
  // --- Konten ---
  container: {
    flex: 1,
    backgroundColor: "transparent", // <-- UBAH: Agar gradasi terlihat
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // <-- UBAH: Warna teks jadi putih
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  // --- FAQ Item (Kartu Putih) ---
  faqItem: {
    backgroundColor: "#fff", // <-- TETAP: Biarkan putih
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  faqQuestionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#333", // Teks di dalam kartu tetap gelap
    marginRight: 10,
  },
  faqAnswer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  faqAnswerText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  // --- Kontak (Kartu Putih) ---
  contactSection: {
    backgroundColor: "#fff", // <-- TETAP: Biarkan putih
    margin: 20,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#001cab", // Teks di dalam kartu tetap biru
    marginBottom: 10,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  contactButton: {
    backgroundColor: "#001cab",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  contactButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});