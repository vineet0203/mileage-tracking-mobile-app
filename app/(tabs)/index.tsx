import { TripList } from "@/src/components/TripList";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const recentTrips = [
    {
      id: "1",
      name: "Client Meeting",
      date: "Today, 10:30 AM",
      totalPrice: "8.40",
      status: "Approved" as const,
      actualMileage: "12.4",
      duration: "25 mins",
    },
    {
      id: "2",
      name: "Office Supply Run",
      date: "Yesterday, 2:15 PM",
      totalPrice: "3.78",
      status: "Pending" as const,
      actualMileage: "8.4",
      duration: "15 mins",
    },
  ];

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Modern Integrated Stats Section */}
        <View className="px-2 pt-6">
          <View className="bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Mileage</Text>
                <Text className="text-white text-3xl font-black">1,248.5 <Text className="text-sm font-bold opacity-60">km</Text></Text>
              </View>
              <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
                <Ionicons name="car" size={24} color="white" />
              </View>
            </View>

            <View className="flex-row gap-x-4 border-t border-white/10 pt-6">
              <View className="flex-1">
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Income</Text>
                <Text className="text-white text-xl font-bold">$842.00</Text>
              </View>
              <View className="w-[1px] h-8 bg-white/10" />
              <View className="flex-1">
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Trips</Text>
                <Text className="text-white text-xl font-bold">54</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Area */}
        <View className="px-2 mt-4">
          {/* Monthly Stats Summary Card */}
          <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex-row items-center mb-4">
            <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mr-4">
              <Ionicons name="trending-up" size={24} color="#1B71E2" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">This Month</Text>
              <View className="flex-row items-baseline">
                <Text className="text-slate-900 text-lg font-bold">342.0 km</Text>
                <Text className="text-primary text-sm font-bold ml-3">$215.40</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View className="mb-8">
            <Text className="text-slate-900 text-xl font-bold mb-4">Quick Actions</Text>

            <TouchableOpacity
              onPress={() => router.push("/trip/new")}
              activeOpacity={0.8}
              className="bg-primary py-3 rounded-2xl flex-row items-center justify-center mb-4 shadow-md shadow-primary/20"
            >
              <Ionicons name="add-circle" size={22} color="white" />
              <Text className="text-white font-bold ml-2">Start New Trip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-white py-3 rounded-2xl flex-row items-center justify-center border border-slate-100 shadow-sm"
            >
              <Ionicons name="document-text" size={20} color="#1B71E2" />
              <Text className="text-slate-700 font-bold ml-2">Trips Report</Text>
            </TouchableOpacity>
          </View>

          {/* Recent Activity using TripList */}
          <View className="pb-24">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 text-xl font-bold">Recent</Text>
              <TouchableOpacity onPress={() => router.push("/trips")}>
                <Text className="text-primary font-bold">See All</Text>
              </TouchableOpacity>
            </View>

            <TripList trips={recentTrips as any} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
