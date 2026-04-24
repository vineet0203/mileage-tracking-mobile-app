import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function TermsOfServiceScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header
        title="Terms of Service"
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
          <Text className="text-slate-900 text-xl font-black mb-4">Service Agreement</Text>
          
          <Text className="text-slate-600 mb-4 leading-6">
            By accessing or using our services, you agree to be bound by these terms. If you do not agree to all of these terms, do not use our services.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">1. User Accounts</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            You must provide accurate information when creating an account. You are responsible for maintaining the security of your account and password.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">2. Prohibited Conduct</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            You agree not to engage in any conduct that violates any law or regulation, or that interferes with the operation of our services.
          </Text>

          <Text className="text-slate-900 font-bold mb-2">3. Termination</Text>
          <Text className="text-slate-600 mb-4 leading-6">
            We reserve the right to terminate or suspend your access to our services at any time, without notice, for any reason.
          </Text>

          <Text className="text-slate-400 text-xs mt-4">Last Updated: April 2026</Text>
        </View>
      </ScreenWrapper>
    </View>
  );
}
