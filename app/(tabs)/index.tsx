import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { TripList } from "@/src/components/TripList";
import { useTrips, useTripStats } from "@/src/hooks/useTrips";
import { TripStatus } from "@/src/types/api";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, RefreshControl, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const { data: trips, isLoading: tripsLoading, refetch: refetchTrips } = useTrips({ limit: 10 });
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useTripStats();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchTrips(), refetchStats()]);
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
    return trips?.slice(0, 5).map(t => ({
      id: String(t.id),
      name: t.title,
      date: new Date(t.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      totalPrice: Number(t.total_price).toFixed(2),
      status: mapStatus(t.status) as any,
      actualMileage: Number(t.distance).toFixed(1),
      duration: t.end_time ? `${Math.round((new Date(t.end_time).getTime() - new Date(t.start_time).getTime()) / 60000)} mins` : 'Active'
    })) || [];
  }, [trips]);

  if (tripsLoading || statsLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8fafc]">
        <ActivityIndicator size="large" color="#1B71E2" />
      </View>
    );
  }

  const summary = {
    totalMileage: Number(stats?.total_mileage || 0),
    totalIncome: Number(stats?.total_income || 0),
    totalTrips: Number(stats?.total_trips || 0),
    monthMileage: Number(stats?.month_distance || 0),
    monthIncome: Number(stats?.month_income || 0),
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <ScreenWrapper 
        withTabBar={true} 
        noPadding={true} 
        scrollable={true} 
        className="py-2"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1B71E2" />
        }
      >
        <View className="px-4">
          <View className="bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30">
            <View className="flex-row justify-between items-start mb-6">
              <View>
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Mileage</Text>
                <Text className="text-white text-3xl font-black">{summary.totalMileage.toFixed(1)} <Text className="text-sm font-bold opacity-60">km</Text></Text>
              </View>
              <View className="w-12 h-12 bg-white/20 rounded-2xl items-center justify-center">
                <Ionicons name="car" size={24} color="white" />
              </View>
            </View>

            <View className="flex-row gap-x-4 border-t border-white/10 pt-6">
              <View className="flex-1">
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Income</Text>
                <Text className="text-white text-xl font-bold">${summary.totalIncome.toFixed(2)}</Text>
              </View>
              <View className="w-[1px] h-8 bg-white/10" />
              <View className="flex-1">
                <Text className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Total Trips</Text>
                <Text className="text-white text-xl font-bold">{summary.totalTrips}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Area */}
        <View className="px-4 mt-4">
          {/* Monthly Stats Summary Card */}
          <View className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex-row items-center mb-4">
            <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mr-4">
              <Ionicons name="trending-up" size={24} color="#1B71E2" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">This Month</Text>
              <View className="flex-row items-baseline">
                <Text className="text-slate-900 text-lg font-bold">{summary.monthMileage.toFixed(1)} km</Text>
                <Text className="text-primary text-sm font-bold ml-3">${summary.monthIncome.toFixed(2)}</Text>
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
          </View>

          {/* Recent Activity using TripList */}
          <View>
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-slate-900 text-xl font-bold">Recent</Text>
              <TouchableOpacity onPress={() => router.push("/trips")}>
                <Text className="text-primary font-bold">See All</Text>
              </TouchableOpacity>
            </View>

            <TripList trips={formattedTrips as any} />
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
}
