import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, Text, TouchableOpacity, View, Alert } from "react-native";

interface ImageUploadProps {
  image: string | null;
  onImageSelect: (uri: string) => void;
  label: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ image, onImageSelect, label }) => {
  const handlePress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your photos to upload the odometer reading.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0];
      console.log(`[Image Upload] Selection for ${label}:`, {
        uri: selectedImage.uri,
        width: selectedImage.width,
        height: selectedImage.height,
        type: selectedImage.type,
      });
      onImageSelect(selectedImage.uri);
    }
  };

  return (
    <View className="mb-8">
      <Text className="text-slate-900 font-bold mb-2 ml-1">{label}</Text>
      <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.8}
        className="bg-white h-40 rounded-[32px] border-2 border-dashed border-slate-200 items-center justify-center overflow-hidden"
      >
        {image ? (
          <Image source={{ uri: image }} className="w-full h-full" resizeMode="contain" />
        ) : (
          <View className="items-center">
            <View className="w-12 h-12 bg-blue-50 rounded-2xl items-center justify-center mb-2">
              <Ionicons name="camera" size={24} color="#1B71E2" />
            </View>
            <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Tap to Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
