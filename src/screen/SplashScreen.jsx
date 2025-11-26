// src/screen/SplashScreen.jsx

import React, { useEffect } from "react"; // <-- Tambah useEffect
import { View, Text, StyleSheet, Image } from "react-native"; // <-- Tambah Image
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient"; // <-- Import LinearGradient
import { StatusBar } from "expo-status-bar"; // Untuk mengatur status bar

// Pastikan path ke splash icon Anda benar
import SplashScreenIcon from "../../assets/splash-icon.png"; 

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Logika ini akan berjalan setelah komponen di-render pertama kali
    const timer = setTimeout(() => {
      // Setelah 3 detik (3000 ms), navigasi ke layar 'Login'
      // `replace` digunakan agar pengguna tidak bisa kembali ke splash screen
      navigation.replace("Login"); 
    }, 3000); // Durasi splash screen (3 detik)

    // Cleanup function: penting untuk membersihkan timer jika komponen di-unmount
    return () => clearTimeout(timer);
  }, []); // Array kosong berarti useEffect hanya berjalan sekali saat mount

  return (
    <LinearGradient // Menggunakan LinearGradient sebagai latar belakang
      colors={["#001cab", "#0bb3e1"]} // Warna gradien Anda
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" /> {/* Status bar menjadi putih agar terlihat di background gelap */}
        <Image source={SplashScreenIcon} style={styles.logo} />
        <Text style={styles.title}>ObatKU</Text>
        <Text style={styles.subtitle}>Temukan kebutuhan Anda dengan mudah</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 180, // Sesuaikan ukuran logo
    height: 180, // Sesuaikan ukuran logo
    resizeMode: "contain", // Pastikan logo tetap proporsional
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#e0e0e0",
    textAlign: "center",
    paddingHorizontal: 40,
  },
});