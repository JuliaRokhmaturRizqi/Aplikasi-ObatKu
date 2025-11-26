// src/components/CategoryCard.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CategoryCard({ color, icon, label, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 100,
    borderRadius: 14,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  icon: {
    fontSize: 26,
  },
  label: {
    marginTop: 6,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
