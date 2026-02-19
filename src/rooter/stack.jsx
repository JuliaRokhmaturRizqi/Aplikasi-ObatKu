// src/rooter/stack.jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Impor Screen
import SplashScreen from '../screen/SplashScreen';
import halamanLogin from '../screen/login';
import halamanDaftar from '../screen/halamanDaftar';
import MainTabs from './MainTabs'; 
import halamanBantuan from '../screen/bantuan';
import DetailProduk from '../screen/DetailProduk'; 
import PetunjukPengguna from '../screen/PetunjukPengguna'; 
import Keranjang from '../screen/Keranjang';
import Notifikasi from '../screen/Notifikasi';
import Checkout from '../screen/Checkout';
import DetailChat from '../screen/DetailChat'; 
import RiwayatPesanan from '../screen/RiwayatPesanan';
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

      <Stack.Screen 
        name="Keranjang" 
        component={Keranjang} 
        options={{ animation: "slide_from_right", headerShown: true, title: "Keranjang Saya" }}
      />
      <Stack.Screen name="Notifikasi" component={Notifikasi} />

      <Stack.Screen name="Checkout" component={Checkout} options={{ animation: "fade_from_bottom", headerShown: false,}} />
      <Stack.Screen 
        name="DetailChat" 
        component={DetailChat} 
        options={({ route }) => ({ 
          title: route.params?.userName || 'Chat', // Judul Header dinamis sesuai nama orang
          headerShown: true, // Tampilkan Header agar bisa tombol Back
          animation: 'slide_from_right' 
        })}
      />
      <Stack.Screen 
        name="Orders" 
        component={RiwayatPesanan} 
        options={{ 
            headerShown: true, 
            title: "Riwayat Pesanan",
            animation: "slide_from_right"
        }} 
      />

    </Stack.Navigator>
  );
}