import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { SearchInput } from "@/src/components/SearchInput";
import { TripList } from "@/src/components/TripList";
import { useTrips } from "@/src/hooks/useTrips";
import { TripStatus } from "@/src/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function TripsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: trips, isLoading, refetch } = useTrips();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const mapStatus = (status: TripStatus) => {
    switch (status) {
      case 'APPROVED': return 'Approved';
      case 'IN_PROGRESS': return 'In Progress';
      case 'REJECTED': return 'Rejected';
      default: return 'Pending';
    }
  };

  const formattedTrips = useMemo(() => {
    if (!trips) return [];
    
    return trips
      .filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(t => ({
        id: String(t.id),
        name: t.title,
        date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        totalPrice: Number(t.total_price).toFixed(2),
        status: mapStatus(t.status) as any,
        actualMileage: Number(t.distance).toFixed(1),
        duration: t.end_time ? `${Math.round((new Date(t.end_time).getTime() - new Date(t.start_time).getTime()) / 60000)} mins` : 'Active'
      }));
  }, [trips, searchQuery]);

  return (
    <View className="flex-1 bg-[#f8fafc]">
      {/* Fixed Action Bar with Search Input */}
      <View className="p-4 flex-row gap-x-3 items-center bg-[#f8fafc]">
        <SearchInput placeholder="Search Trips..." onSearch={setSearchQuery} />

        <TouchableOpacity
          onPress={() => router.push("/trip/new")}
          className="bg-primary px-4 h-14 rounded-2xl flex-row items-center shadow-md shadow-primary/20"
        >
          <Ionicons name="add-circle" size={18} color="white" />
          <Text className="text-white font-bold ml-2 text-xs">Start New</Text>
        </TouchableOpacity>
      </View>

      <ScreenWrapper 
        withTabBar={true} 
        noPadding={true} 
        scrollable={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1B71E2" />
        }
      >
        <View className="px-4 pb-10">
          {isLoading ? (
            <View className="py-20">
              <ActivityIndicator size="large" color="#1B71E2" />
            </View>
          ) : formattedTrips.length > 0 ? (
            <TripList trips={formattedTrips as any} />
          ) : (
            <View className="py-20 items-center">
              <Ionicons name="car-outline" size={64} color="#e2e8f0" />
              <Text className="text-slate-400 font-bold mt-4">No trips found</Text>
            </View>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}
