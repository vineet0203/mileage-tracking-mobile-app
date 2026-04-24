import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import {
  getApiErrorMessage,
  useResetPasswordMutation,
} from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { email, token } = useLocalSearchParams<{
    email: string;
    token: string;
  }>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { mutate: doReset, isPending } = useResetPasswordMutation();

  const handleReset = () => {
    if (!password) {
      Alert.alert("Error", "Please enter a new password.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    doReset(
      { email, token, newPassword: password },
      {
        onSuccess: () => {
          Alert.alert(
            "Password Reset",
            "Your password has been reset successfully. Please login with your new password.",
            [{ text: "Login", onPress: () => router.replace("/login") }],
          );
        },
        onError: (err) => {
          Alert.alert("Reset Failed", getApiErrorMessage(err));
        },
      },
    );
  };

  return (
    <View className="flex-1 bg-white">
      <ScreenWrapper
        keyboardAware={true}
        noPadding={true}
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 48,
          paddingBottom: 40,
        }}
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
          <Text className="text-slate-900 text-3xl font-black text-center mb-2">
            New Password
          </Text>
          <Text className="text-slate-400 text-center px-4">
            Your identity has been verified! Now set a strong new password for
            your account.
          </Text>
        </View>

        <View>
          {/* New Password */}
          <View className="mb-5">
            <Text className="text-slate-900 font-bold mb-2 ml-1">
              New Password
            </Text>
            <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 px-3 text-slate-900 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!isPending}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View className="mb-6">
            <Text className="text-slate-900 font-bold mb-2 ml-1">
              Confirm Password
            </Text>
            <View
              className={`bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border ${
                confirmPassword && confirmPassword !== password
                  ? "border-red-400"
                  : "border-slate-100"
              }`}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 px-3 text-slate-900 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isPending}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#94a3b8"
                />
              </TouchableOpacity>
            </View>
            {confirmPassword && confirmPassword !== password && (
              <Text className="text-red-500 text-xs mt-1 ml-2">
                Passwords do not match
              </Text>
            )}
          </View>

          <TouchableOpacity
            onPress={handleReset}
            disabled={isPending}
            activeOpacity={0.8}
            className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mt-6 shadow-lg shadow-primary/30"
          >
            {isPending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold text-lg">
                Reset Password
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
}

