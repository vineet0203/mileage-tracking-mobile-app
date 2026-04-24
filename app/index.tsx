import { useAuth } from "@/src/hooks/useAuth";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { user } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-[#0f172a]">
      <ScrollView className="flex-1 px-6">
        {/* Header Section */}
        <View className="py-8">
          <Text className="text-slate-400 text-lg font-medium">
            Welcome back,
          </Text>
          <Text className="text-white text-4xl font-bold mt-1">
            {user?.name || "Adventurer"}
          </Text>
        </View>

        {/* Stats Card */}
        <View className="bg-[#1e293b] p-6 rounded-3xl mb-8 shadow-lg">
          <Text className="text-slate-400 text-sm uppercase tracking-widest font-semibold">
            Total Mileage
          </Text>
          <Text className="text-blue-500 text-5xl font-black mt-2">
            1,248.5 <Text className="text-xl">km</Text>
          </Text>

          <View className="flex-row mt-6 pt-6 border-t border-slate-700/50 justify-between">
            <View>
              <Text className="text-slate-400 text-xs">This Month</Text>
              <Text className="text-white text-lg font-bold">342.0 km</Text>
            </View>
            <View>
              <Text className="text-slate-400 text-xs">Total Trips</Text>
              <Text className="text-white text-lg font-bold">54</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-10">
          <Text className="text-white text-xl font-bold mb-4">
            Quick Actions
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-blue-600 py-5 rounded-2xl flex-row items-center justify-center mb-4 shadow-md"
          >
            <Text className="text-white text-lg font-bold">Start New Trip</Text>
          </TouchableOpacity>

          <View className="flex-row gap-4">
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 bg-[#1e293b] py-5 rounded-2xl items-center justify-center border border-slate-700/50 shadow-sm"
            >
              <Text className="text-white font-semibold">History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              className="flex-1 bg-[#1e293b] py-5 rounded-2xl items-center justify-center border border-slate-700/50 shadow-sm"
            >
              <Text className="text-white font-semibold">Reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity Placeholder */}
        <View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-white text-xl font-bold">
              Recent Activity
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-500 font-semibold">See All</Text>
            </TouchableOpacity>
          </View>

          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="bg-[#1e293b]/50 p-4 rounded-2xl mb-3 flex-row items-center"
            >
              <View className="w-12 h-12 bg-slate-700 rounded-full mr-4 items-center justify-center">
                <Text className="text-white">🚗</Text>
              </View>
              <View className="flex-1">
                <Text className="text-white font-bold">Work Commute</Text>
                <Text className="text-slate-400 text-xs">
                  Apr 22, 2026 • 12.4 km
                </Text>
              </View>
              <Text className="text-white font-semibold">$5.40</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
