import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProfileHeaderProps {
  name: string;
  joinedDate: string;
  skills: string[];
  imageUri?: string | null;
  onEditPress: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  joinedDate,
  skills,
  imageUri,
  onEditPress,
}) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
      <View className="flex-row items-center mb-6">
        <View className="relative">
          <View className="w-24 h-24 rounded-full bg-blue-50 items-center justify-center border-4 border-white shadow-sm overflow-hidden">
            {imageUri ? (
              <Image source={{ uri: imageUri }} className="w-full h-full" />
            ) : (
              <Ionicons name="person" size={48} color="#1B71E2" />
            )}
          </View>
          <TouchableOpacity
            onPress={onEditPress}
            activeOpacity={0.8}
            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full items-center justify-center border-2 border-white shadow-sm"
          >
            <Ionicons name="camera" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View className="ml-5 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-900 text-2xl font-black">{name}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="calendar-outline" size={12} color="#94a3b8" />
            <Text className="text-slate-400 text-xs ml-1">Joined {joinedDate}</Text>
          </View>
        </View>
      </View>

      <View className="border-t border-slate-50 pt-5">
        <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">Skills & Services</Text>
        <View className="flex-row flex-wrap gap-2">
          {skills.map((skill, index) => (
            <View key={index} className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
              <Text className="text-slate-600 text-xs font-medium">{skill}</Text>
            </View>
          ))}
          <TouchableOpacity
            onPress={onEditPress}
            className="bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 flex-row items-center"
          >
            <Ionicons name="add" size={14} color="#1B71E2" />
            <Text className="text-primary text-xs font-bold ml-1">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
