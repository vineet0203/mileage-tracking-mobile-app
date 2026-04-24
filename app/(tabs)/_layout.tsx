import { Header } from "@/src/components/Header";
import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function getInitials(name: string | null | undefined): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function TabLayout() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const initials = getInitials(user?.fullname);

  return (
    <Tabs
      screenOptions={{
        header: ({ options, route }) => {
          const isDashboard = route.name === "index";
          const icon =
            route.name === "index"
              ? "grid"
              : route.name === "trips"
                ? "car"
                : "person";

          /** Avatar circle shown on the left of the dashboard header */
          const avatarElement = isDashboard ? (
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3 border border-white/30">
              <Text className="text-white font-black text-sm">{initials}</Text>
            </View>
          ) : undefined;

          return (
            <Header
              title={
                isDashboard
                  ? user?.fullname ?? "Welcome"
                  : options.title ?? "Mileage App"
              }
              variant={isDashboard ? "dashboard" : "default"}
              icon={isDashboard ? undefined : icon}
              leftElement={avatarElement}
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
          height: (Platform.OS === "ios" ? 70 : 60) + insets.bottom,
          paddingBottom: insets.bottom + (Platform.OS === "ios" ? 10 : 8),
          paddingTop: 10,
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
              className={`${focused ? "bg-blue-50" : ""} p-2 rounded-xl items-center justify-center`}
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
              className={`${focused ? "bg-blue-50" : ""} p-2 rounded-xl items-center justify-center`}
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
              className={`${focused ? "bg-blue-50" : ""} p-2 rounded-xl items-center justify-center`}
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
