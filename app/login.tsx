import { useAuthStore } from "@/src/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login
      setUser({
        id: 1,
        email: data.email,
        phone: "+1234567890",
        name: data.email.split("@")[0],
        profile_image: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      router.replace("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Hero Image Container */}
          <View className="h-[40%] w-full relative">
            <Image
              source={require("../assets/images/login_hero.png")}
              className="w-full h-full"
              resizeMode="cover"
            />

          </View>

          {/* Login Form Container */}
          <View className="flex-1 px-8 pt-8 pb-10 bg-white -mt-10 rounded-t-[40px] shadow-2xl">
            <View className="mb-8">
              <Text className="text-blue-600 text-sm font-black uppercase tracking-[4px] mb-2">
                Mileage Tracking
              </Text>
              <Text className="text-3xl font-bold text-slate-900">
                Welcome!
              </Text>
            </View>

            <View className="gap-y-5">
              {/* Email Field */}
              <View>
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      className={`flex-row items-center bg-slate-50 border ${errors.email ? "border-red-500" : "border-slate-200"
                        } rounded-2xl px-4 py-1`}
                    >
                      <TextInput
                        placeholder="Email Address"
                        placeholderTextColor="#94a3b8"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="flex-1 text-slate-900 text-base"
                      />
                    </View>
                  )}
                />
                {errors.email && (
                  <Text className="text-red-500 text-xs mt-1 ml-2">
                    {errors.email.message}
                  </Text>
                )}
              </View>

              {/* Password Field */}
              <View>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View
                      className={`flex-row items-center bg-slate-50 border ${errors.password ? "border-red-500" : "border-slate-200"
                        } rounded-2xl px-4 py-1`}
                    >
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#94a3b8"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry={!showPassword}
                        className="flex-1 text-slate-900 text-base"
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <Ionicons
                          name={showPassword ? "eye-off-outline" : "eye-outline"}
                          size={22}
                          color="#64748b"
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
                {errors.password && (
                  <Text className="text-red-500 text-xs mt-1 ml-2">
                    {errors.password.message}
                  </Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity className="self-end">
                <Text className="text-blue-500 font-medium text-sm">
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                activeOpacity={0.8}
                className="bg-blue-600 h-12 rounded-2xl items-center justify-center mt-2 shadow-lg shadow-blue-300"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white text-base font-bold">Login</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
