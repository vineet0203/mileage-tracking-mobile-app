import { OtpInput } from "@/src/components/auth/OtpInput";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp.length !== 6) return;
    // Mock OTP verification
    console.log("Verifying OTP:", otp, "for", email);
    router.push({
      pathname: "/reset-password",
      params: { email }
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScreenWrapper 
        keyboardAware={true} 
        noPadding={true}
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 48, paddingBottom: 40 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center mb-8"
        >
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </TouchableOpacity>

        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-blue-50 rounded-3xl items-center justify-center mb-6 shadow-sm overflow-hidden">
            <Image
              source={require("../../assets/icons/app-icon.png")}
              className="w-16 h-16"
              resizeMode="contain"
            />
          </View>
          <Text className="text-slate-900 text-3xl font-black text-center mb-2">Verify OTP</Text>
          <Text className="text-slate-400 text-center px-4">
            We have sent a 6-digit verification code to{" "}
            <Text className="text-slate-900 font-bold">{email}</Text>
          </Text>
        </View>

        <OtpInput
          value={otp}
          setValue={setOtp}
          onCodeFilled={(code) => {
            setOtp(code);
            // Optionally auto-verify
          }}
        />

        <TouchableOpacity
          onPress={handleVerify}
          activeOpacity={0.8}
          className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mt-2 shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Verify & Proceed</Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-8">
          <Text className="text-slate-400">Didn't receive code? </Text>
          <TouchableOpacity>
            <Text className="text-primary font-bold">Resend OTP</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
}
