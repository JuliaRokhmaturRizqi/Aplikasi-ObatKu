// src/rooter/stack.jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Impor Screen
import SplashScreen from '../screen/SplashScreen';
import halamanLogin from '../screen/login';
import halamanDaftar from '../screen/halamanDaftar';
import MainTabs from './MainTabs'; 
import halamanBantuan from '../screen/bantuan';
import DetailProduk from '../screen/DetailProduk'; // <--- 1. PASTIKAN INI DI-IMPORT
import PetunjukPengguna from '../screen/PetunjukPengguna'; 
const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator 
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      
      <Stack.Screen 
        name="Login" 
        component={halamanLogin} 
        options={{ animation: 'fade', animationDuration: 400 }} 
      />
      
      <Stack.Screen name="Register" component={halamanDaftar} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Bantuan" component={halamanBantuan} />

      {/* <--- 2. PASTIKAN BAGIAN INI ADA --- */}
      <Stack.Screen 
        name="Detail" 
        component={DetailProduk} 
        options={{ animation: 'slide_from_right' }}
      />

      <Stack.Screen 
        name="PetunjukPengguna" 
        component={PetunjukPengguna} 
        options={{ headerShown: true, title: "Petunjuk Pengguna" }}
      />
    </Stack.Navigator>
  );
}