import { Header } from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TripDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock data fetching based on ID
  const trip = {
    id: id,
    name: "Weekly Client Meeting",
    description: "In-depth discussion with the design team at client office regarding Q2 project deliverables and milestones.",
    date: "April 22, 2026",
    routeName: "City Route B",
    mileageRate: "0.55",
    startAddress: "#234, Line one, North City District",
    endAddress: "#144, Dreamworld Plaza, South City",
    mileage: "15.2",
    finalMileage: "1264.5",
    totalPrice: "8.40",
    status: "Approved" as const,
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header 
        title={`Trip #${trip.id}`}
        leftElement={
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        }
        showNotification={false}
        hasCurve={true}
      />

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        {/* Main Info Card */}
        <View className="px-6 pt-6">
          <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 mb-6">
            <View className="flex-row justify-between items-start mb-4">
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-primary text-[10px] font-bold uppercase tracking-widest">{trip.date}</Text>
              </View>
              <View className={`${trip.status === "Approved" ? "bg-green-50" : "bg-orange-50"} px-3 py-1 rounded-full`}>
                <Text className={`${trip.status === "Approved" ? "text-green-600" : "text-orange-600"} text-[10px] font-bold uppercase`}>
                  {trip.status}
                </Text>
              </View>
            </View>
            <Text className="text-slate-900 text-2xl font-bold mb-2">{trip.name}</Text>
            <Text className="text-slate-400 text-sm leading-5">{trip.description}</Text>
          </View>
        </View>

        {/* Route Visualization */}
        <View className="px-6 mb-6">
          <View className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
            <View className="flex-row items-start">
              <View className="items-center mr-4">
                <View className="w-5 h-5 rounded-full border-4 border-primary bg-white z-10" />
                <View className="w-0.5 h-16 bg-slate-100 my-1" />
                <View className="w-5 h-5 rounded-full border-4 border-green-500 bg-white z-10" />
              </View>
              <View className="flex-1">
                <View className="mb-6">
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Start Location</Text>
                  <Text className="text-slate-900 font-bold text-base">{trip.startAddress}</Text>
                </View>
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Destination</Text>
                  <Text className="text-slate-900 font-bold text-base">{trip.endAddress}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Financial & Distance Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-4">
            <View className="flex-1 bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
              <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Final Distance</Text>
              <Text className="text-slate-900 text-xl font-black">{trip.mileage} <Text className="text-sm font-bold text-slate-400">km</Text></Text>
            </View>
            <View className="flex-1 bg-primary p-5 rounded-3xl shadow-md shadow-primary/20">
              <Text className="text-white/60 text-[10px] font-bold uppercase mb-1">Total Price</Text>
              <Text className="text-white text-xl font-black">${trip.totalPrice}</Text>
            </View>
          </View>
        </View>

        {/* Trip Metadata Tiles */}
        <View className="px-6 mb-8 flex-row gap-4">
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <View className="w-8 h-8 bg-white rounded-lg items-center justify-center mb-2 shadow-sm">
              <Ionicons name="map-outline" size={16} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[9px] font-bold uppercase mb-0.5">Route</Text>
            <Text className="text-slate-900 font-bold text-xs" numberOfLines={1}>{trip.routeName}</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <View className="w-8 h-8 bg-white rounded-lg items-center justify-center mb-2 shadow-sm">
              <Ionicons name="cash-outline" size={16} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[9px] font-bold uppercase mb-0.5">Rate</Text>
            <Text className="text-slate-900 font-bold text-xs">${trip.mileageRate}/km</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <View className="w-8 h-8 bg-white rounded-lg items-center justify-center mb-2 shadow-sm">
              <Ionicons name="speedometer-outline" size={16} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[9px] font-bold uppercase mb-0.5">Odometer</Text>
            <Text className="text-slate-900 font-bold text-xs">{trip.finalMileage} km</Text>
          </View>
        </View>

        {/* Verification Assets */}
        <View className="px-6 mb-32">
          <Text className="text-slate-900 text-lg font-bold mb-4">Verification Proof</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity activeOpacity={0.9} className="flex-1">
              <View className="bg-white p-2 rounded-[28px] shadow-sm border border-slate-100">
                <Image
                  source={require("@/assets/images/trip_odometer.png")}
                  className="w-full h-32 rounded-[20px] bg-slate-100"
                  resizeMode="cover"
                />
                <View className="py-2 items-center">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Starting View</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} className="flex-1">
              <View className="bg-white p-2 rounded-[28px] shadow-sm border border-slate-100">
                <Image
                  source={require("@/assets/images/trip_odometer.png")}
                  className="w-full h-32 rounded-[20px] bg-slate-100"
                  resizeMode="cover"
                />
                <View className="py-2 items-center">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Arrival View</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
