// src/screen/halamanDaftar.jsx

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform, // <-- Tambahkan Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // <-- Tambahkan Ionicons
import { LinearGradient } from "expo-linear-gradient"; // <-- Tambahkan LinearGradient

export default function halamanDaftar({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true); // <-- State untuk toggle password

  const handleRegister = () => {
    // Logika validasi Anda sudah bagus
    if (!name || !email || !password) {
      Alert.alert("Lengkapi Data", "Silakan isi nama, email, dan password.");
      return;
    }
    Alert.alert("Sukses", `Akun ${name} berhasil terdaftar (dummy).`);
    navigation.navigate("Login"); // <-- Ubah ke 'Login' agar lebih jelas
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 40 }}
      >
        <Text style={styles.title}>Daftar Akun Baru</Text>
        <Text style={styles.subtitle}>
          Isi data di bawah untuk membuat akun
        </Text>

        <View style={styles.formContainer}>
          {/* --- Input Nama --- */}
          <Text style={styles.label}>Nama Lengkap</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Nama lengkap Anda"
              style={styles.input}
              placeholderTextColor="#999"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>

          {/* --- Input Email --- */}
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="example@domain.com"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#999"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>

          {/* --- Input Password --- */}
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Minimal 6 karakter"
              secureTextEntry={hidden} // <-- Gunakan state 'hidden'
              style={styles.input}
              placeholderTextColor="#999"
              textContentType={Platform.OS === "ios" ? "password" : "none"}
              underlineColorAndroid="transparent"
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setHidden(!hidden)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={hidden ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#001cab"
              />
            </TouchableOpacity>
          </View>

          {/* --- Tombol Daftar (Gaya Baru) --- */}
          <View style={{ marginTop: 30, marginBottom: 14 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleRegister}
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={["#001cabff", "#0bb3e1ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Daftar Sekarang</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* --- Link 'Masuk' --- */}
          <View style={styles.rowCenter}>
            <Text style={styles.registerText}>Sudah punya akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Masuk Disini</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================
// =  STYLESHEET BARU (Konsisten)    =
// ===================================
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#001cab",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  label: {
    marginTop: 16,
    marginBottom: 8,
    color: "#001cabff",
    fontWeight: "600",
    fontSize: 14,
  },
  // Style input baru (soft UI)
  inputWrapper: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  // Samakan style untuk password
  passwordWrapper: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    color: "#00163fff",
    fontSize: 15,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  // Style tombol (konsisten dengan login)
  buttonContainer: {
    borderRadius: 12,
    shadowColor: "#001cab",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
  },
  // Tautan 'Masuk'
  rowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  registerText: {
    color: "#666",
    fontSize: 14,
  },
  linkText: {
    color: "#001cabff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 5,
  },
});