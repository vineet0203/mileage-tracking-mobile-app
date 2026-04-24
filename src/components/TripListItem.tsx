import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface TripListItemProps {
  id: string;
  name: string;
  date: string;
  totalPrice: string;
  status: "Approved" | "Pending";
  actualMileage: string;
  duration?: string; // Optional if not provided
}

export const TripListItem: React.FC<TripListItemProps> = ({
  id,
  name,
  date,
  totalPrice,
  status,
  actualMileage,
  duration = "0 mins",
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/trip/${id}`)}
      activeOpacity={0.7}
      className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm mb-4"
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1 mr-2">
          <Text className="text-slate-900 font-bold text-lg">{name}</Text>
          <Text className="text-slate-400 text-sm">{date}</Text>
        </View>
        <View className="items-end">
          <View className="bg-blue-50 px-3 py-1 rounded-full mb-2">
            <Text className="text-primary font-bold">${totalPrice}</Text>
          </View>
          <View className={`${status === "Approved" ? "bg-green-50" : "bg-orange-50"} px-2 py-0.5 rounded-md`}>
            <Text className={`${status === "Approved" ? "text-green-600" : "text-orange-600"} text-[9px] font-bold uppercase`}>
              {status}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-x-6 pt-3 border-t border-slate-50">
        <View>
          <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Distance</Text>
          <View className="flex-row items-center">
            <Ionicons name="location" size={14} color="#1B71E2" className="mr-1" />
            <Text className="text-slate-900 font-bold ml-1">{actualMileage} km</Text>
          </View>
        </View>
        <View>
          <Text className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">Duration</Text>
          <View className="flex-row items-center">
            <Ionicons name="time" size={14} color="#1B71E2" className="mr-1" />
            <Text className="text-slate-900 font-bold ml-1">{duration}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
