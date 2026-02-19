// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/rooter/stack";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    // CartProvider harus di paling luar supaya semua screen bisa mengakses cart
    <CartProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </CartProvider>
    // sekarang semua komponen yang ada di dalam RootStack (screen-screen kamu seperti Home, Keranjang, DetailProduk) 
    // bisa memanggil useCart() karena mereka berada di dalam CartProvider.
  );
}
