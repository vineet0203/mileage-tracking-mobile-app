import { Header } from "@/src/components/Header";
import { ImageUpload } from "@/src/components/ImageUpload";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EndTripScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [arrivalLocation, setArrivalLocation] = useState("");
  const [endImage, setEndImage] = useState<string | null>(null);

  // Mock data fetching based on ID
  const trip = {
    id: id,
    name: "Weekly Client Meeting",
    description: "In-depth discussion with the design team at client office regarding Q2 project deliverables and milestones.",
    date: "April 22, 2026",
    startAddress: "#234, Line one, North City District",
  };

  const handleEndTrip = () => {
    // Logic to end trip
    router.replace("/(tabs)/trips");
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header 
        title={`End Trip #${trip.id}`}
        leftElement={
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        }
        showNotification={false}
      />

      <ScrollView 
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-slate-900 text-lg font-bold mb-4">Finalize Your Trip</Text>
        
        <View className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-6">
          <View className="flex-row items-start mb-6">
            <View className="items-center mr-4">
              <View className="w-5 h-5 rounded-full border-4 border-primary bg-white z-10" />
              <View className="w-0.5 h-16 bg-slate-100 my-1" />
              <View className="w-5 h-5 rounded-full border-4 border-slate-200 bg-white z-10" />
            </View>
            <View className="flex-1">
              <View className="mb-6">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Start Location</Text>
                <Text className="text-slate-900 font-bold text-base">{trip.startAddress}</Text>
              </View>
              <View>
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Arrival Location</Text>
                <View className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 mt-1">
                  <TextInput 
                    className="text-slate-900 font-bold text-base p-0"
                    placeholder="Enter arrival address"
                    placeholderTextColor="#94a3b8"
                    value={arrivalLocation}
                    onChangeText={setArrivalLocation}
                  />
                </View>
              </View>
            </View>
          </View>

          <ImageUpload 
            image={endImage} 
            onImageSelect={setEndImage} 
            label="End Odometer Proof" 
          />
        </View>

        <TouchableOpacity 
          onPress={handleEndTrip}
          activeOpacity={0.9}
          className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mb-24 shadow-lg shadow-primary/30"
        >
          <Ionicons name="stop-circle" size={20} color="white" />
          <Text className="text-white font-bold ml-2 text-lg">End Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
