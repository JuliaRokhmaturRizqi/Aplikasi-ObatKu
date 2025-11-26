// src/components/ProfileMenuItem.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Komponen ini akan menerima 3 properti (props):
// 1. 'icon': Nama ikon dari Ionicons (misal: "heart-outline")
// 2. 'label': Teks yang akan ditampilkan (misal: "Favorit")
// 3. 'onPress': Fungsi yang dijalankan saat diklik

export default function ProfileMenuItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Kiri: Ikon */}
      <Ionicons name={icon} size={22} color="#001cab" style={styles.icon} />
      
      {/* Tengah: Teks Label */}
      <Text style={styles.label}>{label}</Text>
      
      {/* Kanan: Ikon Chevron (panah >) */}
      <Ionicons name="chevron-forward-outline" size={20} color="#999" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Garis pemisah yang sangat tipis
  },
  icon: {
    marginRight: 16,
    width: 25, // Memberi ruang agar ikon rapi
    textAlign: "center",
  },
  label: {
    flex: 1, // Mengisi sisa ruang, mendorong chevron ke kanan
    fontSize: 16,
    color: "#333",
  },
});