import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { getApiErrorMessage, useLoginMutation } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Image,
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
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: doLogin, isPending } = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const currentEmail = watch("email");

  const onSubmit = (data: LoginFormValues) => {
    doLogin(
      { email: data.email, password: data.password },
      {
        onError: (err) => {
          Alert.alert("Login Failed", getApiErrorMessage(err));
        },
        // onSuccess navigation is handled by _layout auth guard
      },
    );
  };

  const handleForgotPassword = () => {
    router.push({
      pathname: "/forgot-password",
      params: { email: currentEmail },
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScreenWrapper
        keyboardAware={true}
        noPadding={true}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        {/* Hero Image Container */}
        <View className="h-[38%] w-full relative">
          <Image
            source={require("../../assets/images/login_hero.png")}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Login Form Container */}
        <View className="flex-1 px-4 pt-8 bg-white -mt-10 rounded-t-[40px] shadow-2xl">
          <View className="mb-8 items-center">
            <View className="w-24 h-24 bg-blue-50 rounded-3xl items-center justify-center mb-4 shadow-sm">
              <Image
                source={require("../../assets/icons/app-icon.png")}
                className="w-16 h-16"
                resizeMode="contain"
              />
            </View>
            <Text className="text-primary text-sm font-black uppercase tracking-[4px] mb-2 text-center">
              Mileage Tracking
            </Text>
            <Text className="text-3xl font-bold text-slate-900 text-center">
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
                      } rounded-2xl px-4 h-14`}
                  >
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color="#94a3b8"
                      className="mr-3"
                    />
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
                      } rounded-2xl px-4 h-14`}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#94a3b8"
                      className="mr-3"
                    />
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
            <TouchableOpacity
              onPress={handleForgotPassword}
              activeOpacity={0.7}
              className="self-end py-1"
            >
              <Text className="text-primary font-medium text-sm">
                Forgot password?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
              activeOpacity={0.8}
              className="bg-primary h-12 rounded-2xl items-center justify-center mt-2 shadow-lg shadow-primary/30"
            >
              {isPending ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text className="text-white text-base font-bold">Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScreenWrapper>
    </View>
  );
}

