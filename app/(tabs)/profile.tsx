import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { EditProfileModal } from "@/src/components/profiles/EditProfileModal";
import { ProfileContactInfo } from "@/src/components/profiles/ProfileContactInfo";
import { ProfileHeader } from "@/src/components/profiles/ProfileHeader";
import { ProfileMenu } from "@/src/components/profiles/ProfileMenu";
import { getApiErrorMessage, useAuth, useUpdateProfileMutation, useCurrentUser } from "@/src/hooks/useAuth";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, RefreshControl, View } from "react-native";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { data: user, refetch, isLoading: userLoading } = useCurrentUser();
  const router = useRouter();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfileMutation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Profile state — derived from the authenticated user.
  const profileData = useMemo(() => ({
    name: user?.fullname || "—",
    email: user?.email || "—",
    phone: user?.phone || "—",
    joinedDate: user?.joined_date
      ? new Date(user.joined_date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      : "—",
    skills: user?.designation?.split(",") || [],
    imageUri: null as string | null,
  }), [user]);

  const handleSaveProfile = (phone: string, skills: string[]) => {
    // skills are stored in the 'designation' field as a comma-separated string
    const designation = skills.join(",");

    updateProfile(
      { phone, designation },
      {
        onSuccess: () => {
          setIsEditModalVisible(false);
          Alert.alert("Success", "Profile updated successfully!");
        },
        onError: (err) => {
          Alert.alert("Error", getApiErrorMessage(err, "Failed to update profile"));
        }
      }
    );
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1B71E2" />
        }
      >
        <ProfileHeader
          name={profileData.name}
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
          isSaving={isUpdating}
        />
      </ScreenWrapper>
    </View>
  );
}
