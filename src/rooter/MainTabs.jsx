// src/rooter/MainTabs.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Impor screen yang sudah ada
import halamanHome from "../screen/home";
import halamanProfil from "../screen/profile";
import Dashboard from "../screen/dashboard"; 

// --- [BARU] Impor screen Chat yang baru dibuat ---
import Chat from "../screen/Chat"; 

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#001cab",
        tabBarStyle: { height: 64, paddingBottom: 6, paddingTop: 6 },
      }}
    >
      {/* --- TAB 1 (HOME) --- */}
      <Tab.Screen
        name="Home"
        component={halamanHome}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />

      {/* --- TAB 2 (DASHBOARD) --- */}
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "speedometer" : "speedometer-outline"} size={size} color={color} />
          ),
        }}
      />

      {/* --- [BARU] TAB 3 (CHAT) --- */}
      {/* Saya letakkan di tengah atau sebelum profil */}
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color, size }) => (
            // Menggunakan icon chatbubbles agar terlihat seperti percakapan
            <Ionicons name={focused ? "chatbubbles" : "chatbubbles-outline"} size={size} color={color} />
          ),
        }}
      />

      {/* --- TAB 4 (PROFILE) --- */}
      <Tab.Screen
        name="Profile"
        component={halamanProfil}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "person" : "person-outline"} size={size} color={color} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
}