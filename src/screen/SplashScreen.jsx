// src/screen/SplashScreen.jsx

import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import LogoObatku from "../../assets/LOGO_OBATKU.png";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#001cab", "#0bb3e1"]}
      style={styles.container}
    >
      <StatusBar style="light" />

      <SafeAreaView style={styles.safe}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image source={LogoObatku} style={styles.logo} />
        </View>

        {/* Text */}
        <Text style={styles.title}>ObatKU</Text>
        <Text style={styles.subtitle}>
          Solusi kesehatan{"\n"}mudah & terpercaya
        </Text>

        {/* White Wave */}
        <View style={styles.waveContainer}>
          <View style={styles.wave} />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>© 2025 ObatKU</Text>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },

  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 22,
  },

  waveContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 180,
    overflow: "hidden",
  },

  wave: {
    width: "120%",
    height: "100%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    alignSelf: "center",
  },

  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: "#001cab",
  },
});
