import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { SearchInput } from "@/src/components/SearchInput";
import { TripList } from "@/src/components/TripList";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TripsScreen() {
  const router = useRouter();
  const mockTrips = [
    {
      id: "452",
      name: "Current Active Trip",
      date: "Started Today, 9:00 AM",
      totalPrice: "---",
      status: "In Progress" as const,
      actualMileage: "---",
      duration: "Running",
    },
    {
      id: "1",
      name: "Weekly Client Meeting",
      date: "April 22, 2026",
      totalPrice: "8.40",
      status: "Approved" as const,
      actualMileage: "15.2",
      duration: "25 mins",
    },
    {
      id: "2",
      name: "Office Supply Run",
      date: "April 21, 2026",
      totalPrice: "3.78",
      status: "Pending" as const,
      actualMileage: "8.4",
      duration: "15 mins",
    },
    {
      id: "3",
      name: "Project Site Visit",
      date: "April 20, 2026",
      totalPrice: "27.00",
      status: "Approved" as const,
      actualMileage: "45.0",
      duration: "1h 10m",
    },
    {
      id: "4",
      name: "Downtown Courier",
      date: "April 19, 2026",
      totalPrice: "12.50",
      status: "Approved" as const,
      actualMileage: "18.5",
      duration: "40 mins",
    },
  ];

  return (
    <View className="flex-1 bg-[#f8fafc]">
      {/* Fixed Action Bar with Search Input */}
      <View className="p-4 flex-row gap-x-3 items-center bg-[#f8fafc]">
        <SearchInput placeholder="Search Trips..." onSearch={(query) => console.log("Searching for:", query)} />

        <TouchableOpacity
          onPress={() => router.push("/trip/new")}
          className="bg-primary px-4 h-14 rounded-2xl flex-row items-center shadow-md shadow-primary/20"
        >
          <Ionicons name="add-circle" size={18} color="white" />
          <Text className="text-white font-bold ml-2 text-xs">Start New</Text>
        </TouchableOpacity>
      </View>

      <ScreenWrapper withTabBar={true} noPadding={true} scrollable={true}>
        <View className="px-4">
          <TripList trips={mockTrips as any} />
        </View>
      </ScreenWrapper>
    </View>
  );
}
