import { useAuth } from "@/src/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <ScrollView className="flex-1 px-6 mt-2">
        <View className="bg-white rounded-3xl p-2 mb-8 shadow-sm border border-slate-100">
          <TouchableOpacity className="flex-row items-center p-4 border-b border-slate-50">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="settings-outline" size={20} color="#1B71E2" />
            </View>
            <Text className="text-slate-700 flex-1 font-medium">Settings</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4 border-b border-slate-50">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="notifications-outline" size={20} color="#1B71E2" />
            </View>
            <Text className="text-slate-700 flex-1 font-medium">Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center p-4">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center mr-4">
              <Ionicons name="help-circle-outline" size={20} color="#1B71E2" />
            </View>
            <Text className="text-slate-700 flex-1 font-medium">Help Center</Text>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={logout}
          className="bg-red-50 py-4 rounded-2xl flex-row items-center justify-center border border-red-100 mb-24"
        >
          <Ionicons name="log-out-outline" size={20} color="#ef4444" />
          <Text className="text-red-600 font-bold ml-2">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
