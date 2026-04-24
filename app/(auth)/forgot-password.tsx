import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import {
  getApiErrorMessage,
  useForgotPasswordMutation,
} from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState("");

  const { mutate: sendOtp, isPending } = useForgotPasswordMutation();

  useEffect(() => {
    if (params.email) {
      setEmail(params.email as string);
    }
  }, [params.email]);

  const handleSendOTP = () => {
    const trimmed = email.trim();
    if (!trimmed) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    sendOtp(trimmed, {
      onSuccess: () => {
        // Navigate regardless — backend always returns 200 to prevent enumeration
        router.push({
          pathname: "/verify-otp",
          params: { email: trimmed },
        });
      },
      onError: (err) => {
        Alert.alert("Error", getApiErrorMessage(err));
      },
    });
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
            Forgot Password?
          </Text>
          <Text className="text-slate-400 text-center px-4">
            Enter your email address and we'll send you a 6-digit code to reset
            your password.
          </Text>
        </View>

        <View>
          <View className="mb-6">
            <Text className="text-slate-900 font-bold mb-2 ml-1">
              Email Address
            </Text>
            <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
              <Ionicons name="mail-outline" size={20} color="#94a3b8" />
              <TextInput
                className="flex-1 px-3 text-slate-900 font-medium"
                placeholder="example@mail.com"
                placeholderTextColor="#94a3b8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isPending}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={handleSendOTP}
            disabled={isPending}
            activeOpacity={0.8}
            className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mt-6 shadow-lg shadow-primary/30"
          >
            {isPending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text className="text-white font-bold text-lg">Send OTP Code</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    </View>
  );
}

