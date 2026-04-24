import { useAuth } from "@/src/hooks/useAuth";
import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { ProfileHeader } from "@/src/components/profiles/ProfileHeader";
import { ProfileContactInfo } from "@/src/components/profiles/ProfileContactInfo";
import { ProfileMenu } from "@/src/components/profiles/ProfileMenu";
import { EditProfileModal } from "@/src/components/profiles/EditProfileModal";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  
  // Mock profile state (in a real app, this would come from an API/Store)
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    phone: user?.phone || "+1 234 567 890",
    role: "Senior Independent Contractor",
    joinedDate: "January 2024",
    skills: ["Logistics", "Client Relations", "Route Optimization"],
    imageUri: null as string | null,
  });

  const handleSaveProfile = (phone: string, skills: string[]) => {
    setProfileData(prev => ({ ...prev, phone, skills }));
    setIsEditModalVisible(false);
    Alert.alert("Success", "Profile updated successfully!");
  };

  const handleHelpCenter = () => {
    router.push("/help-center");
  };

  const handlePrivacy = () => {
    router.push("/privacy-policy");
  };

  const handleTerms = () => {
    router.push("/terms-of-service");
  };

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <ScreenWrapper 
        withTabBar={true} 
        noPadding={true} 
        scrollable={true}
        className="px-4 pt-4"
      >
        <ProfileHeader
          name={profileData.name}
          role={profileData.role}
          joinedDate={profileData.joinedDate}
          skills={profileData.skills}
          imageUri={profileData.imageUri}
          onEditPress={() => setIsEditModalVisible(true)}
        />

        <ProfileContactInfo
          email={profileData.email}
          phone={profileData.phone}
          onEditPhone={() => setIsEditModalVisible(true)}
        />

        <ProfileMenu
          onHelpCenterPress={handleHelpCenter}
          onPrivacyPress={handlePrivacy}
          onTermsPress={handleTerms}
          onLogoutPress={logout}
        />

        <EditProfileModal
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          initialPhone={profileData.phone}
          initialSkills={profileData.skills}
          onSave={handleSaveProfile}
        />
      </ScreenWrapper>
    </View>
  );
}
