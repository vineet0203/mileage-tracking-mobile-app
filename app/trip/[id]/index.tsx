import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { useTripDetails } from "@/src/hooks/useTrips";
import { TripStatus } from "@/src/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export default function TripDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: trip, isLoading } = useTripDetails(Number(id));

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8fafc]">
        <ActivityIndicator size="large" color="#1B71E2" />
      </View>
    );
  }

  if (!trip) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8fafc]">
        <Text className="text-slate-500">Trip not found</Text>
      </View>
    );
  }

  const mapStatus = (status: TripStatus) => {
    switch (status) {
      case 'APPROVED': return 'Approved';
      case 'IN_PROGRESS': return 'In Progress';
      case 'REJECTED': return 'Rejected';
      default: return 'Pending';
    }
  };

  const status = mapStatus(trip.status);

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

      <ScreenWrapper withTabBar={false} noPadding={true} scrollable={true} className="px-4 pt-2">
        {/* Main Info Card */}
        <View>
          <View className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-primary text-[10px] font-bold uppercase tracking-widest">
                  {new Date(trip.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </Text>
              </View>
              <View className={`${status === "Approved" ? "bg-green-50" : status === "In Progress" ? "bg-blue-50" : "bg-orange-50"} px-3 py-1 rounded-full`}>
                <Text className={`${status === "Approved" ? "text-green-600" : status === "In Progress" ? "text-primary" : "text-orange-600"} text-[10px] font-bold uppercase`}>
                  {status}
                </Text>
              </View>
            </View>
            <Text className="text-slate-900 text-xl font-bold mb-1">{trip.title}</Text>
            <Text className="text-slate-400 text-xs leading-4">{trip.description || "No description provided."}</Text>
          </View>
        </View>

        {/* Route Visualization */}
        <View className="mb-4">
          <View className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100">
            <View className="flex-row items-start">
              <View className="items-center mr-4">
                <View className="w-5 h-5 rounded-full border-4 border-primary bg-white z-10" />
                <View className="w-0.5 h-12 bg-slate-100 my-1" />
                <View className="w-5 h-5 rounded-full border-4 border-green-500 bg-white z-10" />
              </View>
              <View className="flex-1">
                <View className="mb-4">
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Start Location</Text>
                  <Text className="text-slate-900 font-bold text-sm">{trip.start_location_address}</Text>
                </View>
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Destination</Text>
                  <Text className="text-slate-900 font-bold text-sm">{trip.end_location_address || "Pending arrival..."}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Financial & Distance Stats */}
        <View className="mb-4">
          <View className="flex-row gap-4 mb-3">
            <View className="flex-1 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
              <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Final Distance</Text>
              <Text className="text-slate-900 text-lg font-black">{Number(trip.distance).toFixed(1)} <Text className="text-xs font-bold text-slate-400">km</Text></Text>
            </View>
            <View className="flex-1 bg-primary p-4 rounded-3xl shadow-md shadow-primary/20">
              <Text className="text-white/60 text-[10px] font-bold uppercase mb-1">Total Price</Text>
              <Text className="text-white text-lg font-black">${Number(trip.total_price).toFixed(2)}</Text>
            </View>
          </View>

          {/* System Extracted Metrics */}
          {(trip.extracted_distance !== null || trip.extracted_total_price !== null) && (
            <View className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-xl items-center justify-center mr-3">
                <Ionicons name="scan-outline" size={16} color="#1B71E2" />
              </View>
              <View className="flex-1 flex-row justify-between items-center">
                <View>
                  <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-tighter">AI Extracted Distance</Text>
                  <Text className="text-slate-900 font-bold">{trip.extracted_distance || 0} km</Text>
                </View>
                <View className="items-end">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-tighter">AI Extracted Price</Text>
                  <Text className="text-primary font-bold">${Number(trip.extracted_total_price || 0).toFixed(2)}</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Trip Metadata Tiles */}
        <View className="mb-6 flex-row gap-3">
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <View className="w-7 h-7 bg-white rounded-lg items-center justify-center mb-1.5 shadow-sm">
              <Ionicons name="map-outline" size={14} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[8px] font-bold uppercase mb-0.5">Route</Text>
            <Text className="text-slate-900 font-bold text-[10px]" numberOfLines={1}>{trip.route_name}</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <View className="w-7 h-7 bg-white rounded-lg items-center justify-center mb-1.5 shadow-sm">
              <Ionicons name="cash-outline" size={14} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[8px] font-bold uppercase mb-0.5">Rate</Text>
            <Text className="text-slate-900 font-bold text-[10px]">${Number(trip.route_rate).toFixed(2)}/km</Text>
          </View>
          <View className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
            <View className="w-7 h-7 bg-white rounded-lg items-center justify-center mb-1.5 shadow-sm">
              <Ionicons name="time-outline" size={14} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 text-[8px] font-bold uppercase mb-0.5">Duration</Text>
            <Text className="text-slate-900 font-bold text-[10px]">
              {trip.end_time ? `${Math.round((new Date(trip.end_time).getTime() - new Date(trip.start_time).getTime()) / 60000)}m` : "Active"}
            </Text>
          </View>
        </View>

        {/* Verification Assets */}
        <View className="mb-10">
          <Text className="text-slate-900 text-lg font-bold mb-4">Verification Proof</Text>
          <View className="flex-row gap-4">
            <TouchableOpacity activeOpacity={0.9} className="flex-1">
              <View className="bg-white p-2 rounded-[28px] shadow-sm border border-slate-100">
                {trip.start_odometer_img ? (
                  <Image
                    source={{ uri: trip.start_odometer_img }}
                    className="w-full h-32 rounded-[20px] bg-slate-100"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-32 rounded-[20px] bg-slate-100 items-center justify-center">
                    <Ionicons name="image-outline" size={32} color="#94a3b8" />
                  </View>
                )}
                <View className="py-2 items-center">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Starting View</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.9} className="flex-1">
              <View className="bg-white p-2 rounded-[28px] shadow-sm border border-slate-100">
                {trip.end_odometer_img ? (
                  <Image
                    source={{ uri: trip.end_odometer_img }}
                    className="w-full h-32 rounded-[20px] bg-slate-100"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-32 rounded-[20px] bg-slate-100 items-center justify-center">
                    <Ionicons name="image-outline" size={32} color="#94a3b8" />
                  </View>
                )}
                <View className="py-2 items-center">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Arrival View</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
}
