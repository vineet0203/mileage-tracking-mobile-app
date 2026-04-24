import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleReset = () => {
    if (!password || password !== confirmPassword) {
      // Show error
      return;
    }
    // Mock password reset
    console.log("Resetting password for:", email);
    // Success - redirect to login
    router.replace("/login");
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
          <Text className="text-slate-900 text-3xl font-black text-center mb-2">New Password</Text>
          <Text className="text-slate-400 text-center px-4">
            Your identity has been verified! Now set a strong new password for your account.
          </Text>
        </View>

        <View>
          <View className="mb-5">
            <Text className="text-slate-900 font-bold mb-2 ml-1">New Password</Text>
            <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 px-3 text-slate-900 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-slate-900 font-bold mb-2 ml-1">Confirm Password</Text>
            <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 px-3 text-slate-900 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleReset}
            activeOpacity={0.8}
            className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mt-6 shadow-lg shadow-primary/30"
          >
            <Text className="text-white font-bold text-lg">Reset Password</Text>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
}
