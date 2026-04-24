import { Header } from "@/src/components/Header";
import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const { user, logout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        header: ({ options, route }) => {
          const isDashboard = route.name === "index";
          const icon = route.name === "index" ? "grid" : route.name === "trips" ? "car" : "person";
          return (
            <Header
              title={isDashboard ? (user?.name || "Adventurer") : (options.title || "Mileage App")}
              variant={isDashboard ? "dashboard" : "default"}
              icon={icon}
              hasCurve={true}
              showNotification={true}
            />
          );
        },
        tabBarActiveTintColor: "#1B71E2",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 30 : 12,
          paddingTop: 12,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "bg-blue-50" : ""
                } p-2 rounded-xl items-center justify-center`}
              style={{ width: 44, height: 44 }}
            >
              <Ionicons
                name={focused ? "grid" : "grid-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="trips"
        options={{
          title: "Your Trips",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "bg-blue-50" : ""
                } p-2 rounded-xl items-center justify-center`}
              style={{ width: 44, height: 44 }}
            >
              <Ionicons
                name={focused ? "car" : "car-outline"}
                size={24}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              className={`${focused ? "bg-blue-50" : ""
                } p-2 rounded-xl items-center justify-center`}
              style={{ width: 44, height: 44 }}
            >
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={22}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
