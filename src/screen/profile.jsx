// src/screen/profile.jsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // <-- 1. DIIMPOR KEMBALI
import ProfileMenuItem from "../components/ProfileMenuItem";

// Ini adalah placeholder untuk gambar profil
const PROFILE_IMAGE_URL = "https://i.pravatar.cc/150?img=12";

export default function halamanProfil({ navigation }) {
  // Fungsi dummy untuk tombol menu
  const handleMenuPress = (menuName) => {
    Alert.alert("Navigasi", `Tombol "${menuName}" ditekan.`);
  };

  // Fungsi khusus untuk Logout
  const handleLogout = () => {
    Alert.alert(
      "Keluar",
      "Apakah Anda yakin ingin keluar dari akun Anda?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Keluar",
          style: "destructive",
          onPress: () => {
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* --- 1. HEADER --- */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Saya</Text>
          <TouchableOpacity onPress={() => handleMenuPress("Pengaturan")}>
            <Ionicons name="settings-outline" size={24} color="#001cab" />
          </TouchableOpacity>
        </View>

        {/* --- 2. INFO CARD PENGGUNA (DESAIN BARU) --- */}
        <View style={styles.infoCard}>
          {/* Bagian Kiri: Gambar */}
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: PROFILE_IMAGE_URL }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => handleMenuPress("Ganti Foto")}
            >
              <Ionicons name="camera-outline" size={16} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Bagian Kanan: Teks & Tombol */}
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileName}>Julia Rokhmatur Rizqi</Text>
            <Text style={styles.profileEmail}>julia@Gmail.com</Text>

            {/* =================================== */}
            {/* =    PERUBAHAN TOMBOL ANDA      = */}
            {/* =================================== */}
            <TouchableOpacity
              style={styles.editButtonContainer} // <-- 2. STYLE CONTAINER BARU
              onPress={() => handleMenuPress("Edit Profil")}
            >
              <LinearGradient
                colors={["#001cabff", "#0bb3e1ff"]} // <-- WARNA ANDA
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.editButtonGradient} // <-- 3. STYLE GRADIENT BARU
              >
                <Text style={styles.editButtonText}>Edit Profil</Text>
              </LinearGradient>
            </TouchableOpacity>
            {/* =================================== */}
            {/* =      AKHIR PERUBAHAN TOMBOL     = */}
            {/* =================================== */}

          </View>
        </View>

        {/* --- 3. DAFTAR MENU (Menggunakan "Batu Bata") --- */}
        <View style={styles.menuContainer}>
          <ProfileMenuItem
            icon="receipt-outline"
            label="Riwayat Pesanan"
            onPress={() => handleMenuPress("Riwayat Pesanan")}
          />
          <ProfileMenuItem
            icon="location-outline"
            label="Alamat Tersimpan"
            onPress={() => handleMenuPress("Alamat Tersimpan")}
          />
          <ProfileMenuItem
            icon="help-circle-outline"
            label="Pusat Bantuan"
            onPress={() => navigation.navigate("Bantuan")}
          />
          <ProfileMenuItem
            icon="log-out-outline"
            label="Keluar"
            onPress={handleLogout}
          />
          <ProfileMenuItem
            icon="book-outline"
            label="Petunjuk Pengguna"
            onPress={() => navigation.navigate("PetunjukPengguna")}
          />

          <ProfileMenuItem icon="log-out-outline" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================
// =    STYLESHEET YANG DIPERBARUI   =
// ===================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },
  container: {
    flex: 1,
  },
  // --- Header ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 30 : 20,
    paddingBottom: 10,
    backgroundColor: "#f6f7fb",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#001cab",
  },

  // --- Info Card ---
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    marginRight: 16,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff'
  },
  profileInfoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#777",
    marginBottom: 16,
  },

  // --- STYLE TOMBOL EDIT (DIUBAH) ---
  editButtonContainer: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    shadowColor: "#001cab", // Bayangan biru
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  editButtonGradient: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  // ---------------------------------

  // --- Menu List (Tetap sama) ---
  menuContainer: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: "hidden",
  },
});