import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export interface TripCardProps {
  id: string;
  name: string;
  description: string;
  date: string;
  routeName: string;
  mileageRate: string;
  startAddress: string;
  endAddress: string;
  actualMileage: string;
  finalMileage: string;
  totalPrice: string;
  status: "Approved" | "Pending";
  startImage?: any;
  endImage?: any;
}

export const TripCard: React.FC<TripCardProps> = ({
  name,
  description,
  date,
  routeName,
  mileageRate,
  startAddress,
  endAddress,
  actualMileage,
  finalMileage,
  totalPrice,
  status,
  startImage,
  endImage,
}) => {
  return (
    <View className="bg-white rounded-[32px] border border-slate-100 shadow-sm mb-6 overflow-hidden">
      {/* Header Info */}
      <View className="p-6 border-b border-slate-50">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-slate-900 font-bold text-xl">{name}</Text>
            <Text className="text-slate-400 text-sm">{description}</Text>
          </View>
          <View className={`${status === "Approved" ? "bg-green-50" : "bg-orange-50"} px-3 py-1 rounded-full`}>
            <Text className={`${status === "Approved" ? "text-green-600" : "text-orange-600"} text-[10px] font-bold uppercase`}>
              {status}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-x-4 mt-2">
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={14} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-1">{date}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="map-outline" size={14} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-1">{routeName}</Text>
          </View>
        </View>
      </View>

      {/* Details Table style */}
      <View className="bg-slate-50/50 p-4">
        <View className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <DetailRow icon="location" label="Starting Address" value={startAddress} />
          <DetailRow icon="flag" label="Ending Address" value={endAddress} />
          <DetailRow icon="speedometer" label="Actual Mileage" value={`${actualMileage} km`} />
          <DetailRow icon="stats-chart" label="Final Mileage" value={`${finalMileage} km`} />
          <DetailRow icon="cash" label="Total Price" value={`$${totalPrice}`} isLast />
        </View>
      </View>

      {/* Images Section */}
      <View className="px-4 pb-6 pt-2">
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Image
              source={startImage || ""}
              className="w-full h-32 rounded-2xl bg-slate-100"
              resizeMode="cover"
            />
            <Text className="text-center text-slate-400 text-[10px] mt-2 font-bold uppercase">Starting Destination</Text>
          </View>
          <View className="flex-1">
            <Image
              source={endImage || ""}
              className="w-full h-32 rounded-2xl bg-slate-100"
              resizeMode="cover"
            />
            <Text className="text-center text-slate-400 text-[10px] mt-2 font-bold uppercase">Arrival Destination</Text>
          </View>
        </View>
      </View>

      {/* Mileage Rate Footer */}
      <View className="bg-primary/5 px-6 py-3 border-t border-primary/10">
        <Text className="text-primary text-[10px] font-bold uppercase text-center tracking-widest">
          Mileage Rate: ${mileageRate} / km
        </Text>
      </View>
    </View>
  );
};

const DetailRow = ({ icon, label, value, isLast }: { icon: any, label: string, value: string, isLast?: boolean }) => (
  <View className={`flex-row items-center justify-between p-3.5 ${!isLast ? "border-b border-slate-50" : ""}`}>
    <View className="flex-row items-center flex-1">
      <View className="w-8 h-8 bg-blue-50 rounded-lg items-center justify-center mr-3">
        <Ionicons name={icon} size={16} color="#1B71E2" />
      </View>
      <Text className="text-slate-500 text-xs font-medium">{label}</Text>
    </View>
    <Text className="text-slate-900 text-xs font-bold text-right flex-1" numberOfLines={1}>{value}</Text>
  </View>
);
