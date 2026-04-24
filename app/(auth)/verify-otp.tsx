import { OtpInput } from "@/src/components/auth/OtpInput";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import {
  getApiErrorMessage,
  useForgotPasswordMutation,
} from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";

const RESEND_COUNTDOWN = 30;

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { mutate: resendOtp, isPending: isResending } =
    useForgotPasswordMutation();

  // Start countdown on mount
  useEffect(() => {
    startCountdown();
    return () => clearInterval(timerRef.current!);
  }, []);

  function startCountdown() {
    setCountdown(RESEND_COUNTDOWN);
    clearInterval(timerRef.current!);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  const handleVerify = () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the complete 6-digit code.");
      return;
    }
    // OTP is validated server-side during reset-password — pass it along
    router.push({
      pathname: "/reset-password",
      params: { email, token: otp },
    });
  };

  const handleResend = () => {
    if (countdown > 0 || isResending) return;

    resendOtp(email, {
      onSuccess: () => {
        setOtp("");
        startCountdown();
        Alert.alert("OTP Sent", "A new code has been sent to your email.");
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
            Verify OTP
          </Text>
          <Text className="text-slate-400 text-center px-4">
            We have sent a 6-digit verification code to{" "}
            <Text className="text-slate-900 font-bold">{email}</Text>
          </Text>
        </View>

        <OtpInput
          value={otp}
          setValue={setOtp}
          onCodeFilled={(code) => setOtp(code)}
        />

        <TouchableOpacity
          onPress={handleVerify}
          activeOpacity={0.8}
          className="bg-primary py-4 rounded-2xl flex-row items-center justify-center mt-2 shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Verify & Proceed</Text>
        </TouchableOpacity>

        {/* Resend OTP */}
        <View className="flex-row justify-center mt-8 items-center">
          <Text className="text-slate-400">Didn't receive code? </Text>
          {countdown > 0 ? (
            <Text className="text-slate-500 font-medium">
              Resend in {countdown}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend} disabled={isResending}>
              <Text className="text-primary font-bold">
                {isResending ? "Sending…" : "Resend OTP"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScreenWrapper>
    </View>
  );
}

