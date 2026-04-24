import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileMenuProps {
  onHelpCenterPress: () => void;
  onPrivacyPress: () => void;
  onTermsPress: () => void;
  onLogoutPress: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  onHelpCenterPress,
  onPrivacyPress,
  onTermsPress,
  onLogoutPress,
}) => {
  return (
    <View className="gap-y-4">
      <View className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
        <TouchableOpacity 
          onPress={onHelpCenterPress}
          className="p-4 flex-row items-center border-b border-slate-50"
        >
          <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center mr-4">
            <Ionicons name="help-circle-outline" size={20} color="#64748b" />
          </View>
          <Text className="text-slate-700 flex-1 font-bold">Help Center</Text>
          <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onPrivacyPress}
          className="p-4 flex-row items-center border-b border-slate-50"
        >
          <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center mr-4">
            <Ionicons name="shield-checkmark-outline" size={20} color="#64748b" />
          </View>
          <Text className="text-slate-700 flex-1 font-bold">Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={onTermsPress}
          className="p-4 flex-row items-center"
        >
          <View className="w-10 h-10 bg-slate-50 rounded-2xl items-center justify-center mr-4">
            <Ionicons name="document-text-outline" size={20} color="#64748b" />
          </View>
          <Text className="text-slate-700 flex-1 font-bold">Terms of Service</Text>
          <Ionicons name="chevron-forward" size={18} color="#cbd5e1" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        onPress={onLogoutPress}
        activeOpacity={0.8}
        className="bg-red-50 h-14 rounded-2xl flex-row items-center justify-center border border-red-100 mb-10"
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text className="text-red-600 font-black ml-2">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};
