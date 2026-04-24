import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock data fetching based on ID
  const trip = {
    id: id,
    name: "Weekly Client Meeting",
    description: "Meeting with the design team at client office",
    date: "April 22, 2026",
    routeName: "City Route B",
    mileageRate: "0.55",
    startAddress: "#234, Line one, City",
    endAddress: "#144, Dreamworld, City",
    actualMileage: "15.2",
    finalMileage: "1264.5",
    totalPrice: "8.40",
    status: "Approved" as const,
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      {/* Header */}
      <View className="bg-primary pt-16 pb-8 px-6 rounded-b-[40px] shadow-lg">
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Trip Details</Text>
          <View className="w-10" /> {/* Spacer */}
        </View>

        <View className="items-center">
          <View className="bg-white/10 px-4 py-1 rounded-full mb-3">
            <Text className="text-white/80 text-[10px] font-bold uppercase tracking-widest">{trip.date}</Text>
          </View>
          <Text className="text-white text-3xl font-black">${trip.totalPrice}</Text>
          <View className={`${trip.status === "Approved" ? "bg-green-500/20" : "bg-orange-500/20"} px-3 py-1 rounded-full mt-3`}>
            <Text className={`${trip.status === "Approved" ? "text-green-300" : "text-orange-300"} text-[10px] font-bold uppercase`}>
              {trip.status}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6 mt-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Info Section */}
        <View className="mb-8">
          <Text className="text-slate-900 text-2xl font-bold mb-1">{trip.name}</Text>
          <Text className="text-slate-400 text-sm mb-6">{trip.description}</Text>

          <View className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <DetailItem icon="map-outline" label="Route Name" value={trip.routeName} />
            <DetailItem icon="cash-outline" label="Mileage Rate" value={`$${trip.mileageRate} / km`} />
            <DetailItem icon="location-outline" label="Start Address" value={trip.startAddress} />
            <DetailItem icon="flag-outline" label="End Address" value={trip.endAddress} />
            <DetailItem icon="speedometer-outline" label="Actual Mileage" value={`${trip.actualMileage} km`} />
            <DetailItem icon="stats-chart-outline" label="Final Mileage" value={`${trip.finalMileage} km`} isLast />
          </View>
        </View>

        {/* Images Section */}
        <View className="mb-24">
          <Text className="text-slate-900 text-lg font-bold mb-4">Verification Images</Text>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Image
                source={require("@/assets/images/trip_odometer.png")}
                className="w-full h-40 rounded-3xl bg-slate-100"
                resizeMode="cover"
              />
              <Text className="text-center text-slate-400 text-[10px] mt-2 font-bold uppercase">Starting Point</Text>
            </View>
            <View className="flex-1">
              <Image
                source={require("@/assets/images/trip_odometer.png")}
                className="w-full h-40 rounded-3xl bg-slate-100"
                resizeMode="cover"
              />
              <Text className="text-center text-slate-400 text-[10px] mt-2 font-bold uppercase">Ending Point</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const DetailItem = ({ icon, label, value, isLast }: { icon: any, label: string, value: string, isLast?: boolean }) => (
  <View className={`flex-row items-center p-4 ${!isLast ? "border-b border-slate-50" : ""}`}>
    <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
      <Ionicons name={icon} size={18} color="#1B71E2" />
    </View>
    <View className="flex-1">
      <Text className="text-slate-400 text-[10px] font-bold uppercase mb-0.5">{label}</Text>
      <Text className="text-slate-900 font-bold">{value}</Text>
    </View>
  </View>
);
