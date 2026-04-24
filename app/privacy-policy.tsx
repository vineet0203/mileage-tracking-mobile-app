import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header
        title="Privacy Policy"
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

      <ScreenWrapper noPadding={true} scrollable={true} className="px-4 pt-6">
        <View className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm mb-10">
          <Text className="text-slate-900 text-xl font-black mb-4">Data Privacy Statement</Text>
          
          <Text className="text-slate-600 mb-4 leading-6">
            At Mileage Tracking, we take your privacy seriously. This policy describes how we collect, use, and protect your personal and location data.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">1. Data Collection</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            We collect information you provide directly to us, such as when you create an account, track a trip, or contact support. This includes your name, email address, phone number, and odometer readings.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">2. Use of Information</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            We use the information we collect to provide, maintain, and improve our services, and to process and complete transactions related to your mileage tracking.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">3. Data Security</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
          </Text>

          <Text className="text-slate-400 text-xs mt-4">Last Updated: April 2026</Text>
        </View>
      </ScreenWrapper>
    </View>
  );
}
