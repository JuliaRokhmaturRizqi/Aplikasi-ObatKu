import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import photo from "../../assets/login.png";
import { Ionicons } from "@expo/vector-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faApple, faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function halamanLogin({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidden, setHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    if (!email || !password) {
      Alert.alert("Perhatian", "Silakan isi email dan password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.toLowerCase() === "admin@obatku.com" && password === "123456") {
        navigation.replace("Main");
      } else {
        setError("Email atau password yang Anda masukkan salah.");
      }
    }, 1000);
  };

  const handleSocial = (provider) => {
    Alert.alert("Social login", `Tombol ${provider} ditekan (dummy).`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingVertical: 40 }}
      >
        <View style={styles.centerTop}>
          <Image source={photo} style={styles.logo} />
          <Text style={styles.title}>SELAMAT DATANG!</Text>
        </View>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Silahkan masukan nama dan password Anda
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nama / Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={22}
              color="#666"
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Username/Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              underlineColorAndroid="transparent"
            />
          </View>

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
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={hidden}
              textContentType={Platform.OS === "ios" ? "password" : "none"}
              underlineColorAndroid="transparent"
              style={styles.input}
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

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => Alert.alert("Lupa Password", "Fitur ini belum tersedia.")}
          >
            <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
          </TouchableOpacity>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={{ marginTop: 24, marginBottom: 14 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleLogin}
              accessibilityLabel="Masuk"
              style={styles.buttonContainer}
            >
              <LinearGradient
                colors={["#001cabff", "#0bb3e1ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Sedang..." : "Masuk"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.rowCenter}>
            <Text style={styles.registerText}>Belum Punya Akun? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.linkText}>Daftar Disini</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Garis pemisah "atau" */}
        <View style={styles.dividerWrapper}>
          <View style={styles.line} />
          <Text style={styles.orText}>atau masuk dengan</Text>
          <View style={styles.line} />
        </View>

        {/* --- PERUBAHAN DI SINI --- */}
        {/* Tombol login sosial (HANYA IKON) */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocial("Google")}
          >
            <FontAwesomeIcon icon={faGoogle} style={styles.socialIcon} size={24} />
            {/* Teks "Google" dihapus */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocial("Facebook")}
          >
            <FontAwesomeIcon icon={faFacebook} style={styles.socialIcon} size={24} />
            {/* Teks "Facebook" dihapus */}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocial("Apple")}
          >
            <FontAwesomeIcon icon={faApple} style={styles.socialIcon} size={24} />
            {/* Teks "Apple" dihapus */}
          </TouchableOpacity>
        </View>
        {/* --- AKHIR PERUBAHAN --- */}

      </ScrollView>
    </SafeAreaView>
  );
}

// ===================================
// =      STYLESHEET YANG BARU       =
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
  centerTop: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#001cabff",
  },
  subtitleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  label: {
    // --- PERUBAHAN 'RUANG NAPAS' ---
    marginTop: 20, // Diubah dari 16
    marginBottom: 8,
    color: "#001cabff",
    fontWeight: "600",
    fontSize: 14,
  },
  inputWrapper: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
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
  forgotPasswordButton: {
    alignSelf: "flex-end",
    // --- PERUBAHAN 'RUANG NAPAS' ---
    marginTop: 15, // Diubah dari 12
  },
  forgotPasswordText: {
    color: "#001cab",
    fontWeight: "600",
    fontSize: 13,
  },
  errorText: {
    color: "#D92121",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    // --- PERUBAHAN 'RUANG NAPAS' ---
    marginTop: 20, // Diubah dari 15
  },
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
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  orText: {
    fontSize: 14,
    color: "#999",
    marginHorizontal: 15,
  },

  // --- STYLESHEET TOMBOL SOSIAL (PERUBAHAN BESAR) ---
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center", // Posisikan di tengah
    paddingHorizontal: 30,
    gap: 20, // (Jika tidak didukung, marginHorizontal di socialButton akan berfungsi)
  },
  socialButton: {
    // flex: 1, // Dihapus agar tidak memanjang
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12, // Anda bisa ubah ke 28 untuk membuatnya bulat
    width: 56,  // Atur lebar
    height: 56, // Atur tinggi
    marginHorizontal: 10, // Jarak antar tombol (pengganti 'gap')
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  socialIcon: {
    // marginRight: 10, // Dihapus (karena tidak ada teks)
    color: "#001cabff",
  },
  // socialText tidak lagi digunakan
}); 