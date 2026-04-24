import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileContactInfoProps {
  email: string;
  phone: string;
  onEditPhone: () => void;
}

export const ProfileContactInfo: React.FC<ProfileContactInfoProps> = ({
  email,
  phone,
  onEditPhone,
}) => {
  return (
    <View className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 mb-6">
      <View className="p-4 flex-row items-center border-b border-slate-50">
        <View className="w-10 h-10 bg-blue-50 rounded-2xl items-center justify-center mr-4">
          <Ionicons name="mail-outline" size={20} color="#1B71E2" />
        </View>
        <View className="flex-1">
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Email Address</Text>
          <Text className="text-slate-900 font-bold">{email}</Text>
        </View>
      </View>

      <TouchableOpacity 
        onPress={onEditPhone}
        activeOpacity={0.7}
        className="p-4 flex-row items-center"
      >
        <View className="w-10 h-10 bg-blue-50 rounded-2xl items-center justify-center mr-4">
          <Ionicons name="call-outline" size={20} color="#1B71E2" />
        </View>
        <View className="flex-1">
          <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">Phone Number</Text>
          <Text className="text-slate-900 font-bold">{phone}</Text>
        </View>
        <Ionicons name="create-outline" size={18} color="#94a3b8" />
      </TouchableOpacity>
    </View>
  );
};
