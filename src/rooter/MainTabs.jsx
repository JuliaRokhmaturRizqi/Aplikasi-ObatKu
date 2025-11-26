// src/rooter/MainTabs.jsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import halamanHome from "../screen/home";
import halamanProfil from "../screen/profile";
import Dashboard from "../screen/dashboard"; // <-- IMPORT DASHBOARD

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

      {/* --- TAB 3 (PROFILE) --- */}
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
      
      {/* Tambah tab lain di sini nanti... */}
      
    </Tab.Navigator>
  );
}
