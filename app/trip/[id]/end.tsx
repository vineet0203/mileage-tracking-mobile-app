import { uploadImage } from "@/src/api/uploads";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { ImageUpload } from "@/src/components/ImageUpload";
import { getApiErrorMessage } from "@/src/hooks/useAuth";
import { useEndTripMutation, useTripDetails } from "@/src/hooks/useTrips";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EndTripScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: trip, isLoading: tripLoading } = useTripDetails(Number(id));
  const { mutate: endTrip, isPending: isEnding } = useEndTripMutation();

  const [arrivalLocation, setArrivalLocation] = useState("");
  const [endMileage, setEndMileage] = useState("");
  const [endImage, setEndImage] = useState<string | null>(null);

  const [isUploading, setIsUploading] = useState(false);

  const handleEndTrip = async () => {
    if (!arrivalLocation.trim()) {
      Alert.alert("Error", "Please enter an arrival address.");
      return;
    }
    const parsedMileage = parseFloat(endMileage);
    if (isNaN(parsedMileage) || parsedMileage < 0) {
      Alert.alert("Error", "Please enter a valid end mileage.");
      return;
    }
    if (trip && parsedMileage < Number(trip.start_mileage)) {
      Alert.alert("Error", `End mileage cannot be less than start mileage (${trip.start_mileage}).`);
      return;
    }

    let end_odometer_img = undefined;

    try {
      if (endImage) {
        setIsUploading(true);
        end_odometer_img = await uploadImage(endImage);
      }

      endTrip({
        id: Number(id),
        payload: {
          end_location_address: arrivalLocation.trim(),
          end_mileage: parsedMileage,
          end_odometer_img,
        }
      }, {
        onSuccess: () => {
          Alert.alert("Success", "Trip ended successfully!");
          router.replace("/(tabs)/trips");
        },
        onError: (err) => {
          Alert.alert("Error", getApiErrorMessage(err, "Failed to end trip."));
        },
        onSettled: () => {
          setIsUploading(false);
        }
      });
    } catch (err) {
      setIsUploading(false);
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  if (tripLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#f8fafc]">
        <ActivityIndicator size="large" color="#1B71E2" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header
        title={`End Trip #${id}`}
        leftElement={
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        }
        showNotification={false}
      />

      <ScreenWrapper
        keyboardAware={true}
      >
        <Text className="text-slate-900 text-lg font-bold mb-4">Finalize Your Trip</Text>

        <View className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm mb-6">
          {/* Location Timeline */}
          <View className="flex-row items-start mb-5">
            <View className="items-center mr-4">
              <View className="w-5 h-5 rounded-full border-4 border-primary bg-white z-10" />
              <View className="w-0.5 h-16 bg-slate-100 my-1" />
              <View className="w-5 h-5 rounded-full border-4 border-slate-200 bg-white z-10" />
            </View>
            <View className="flex-1">
              <View className="mb-6">
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Start Location</Text>
                <Text className="text-slate-900 font-bold text-base">{trip?.start_location_address || "Loading..."}</Text>
              </View>
              <View>
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Arrival Location</Text>
                <View className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 mt-1">
                  <TextInput
                    className="text-slate-900 font-bold text-base p-0"
                    placeholder="Enter arrival address"
                    placeholderTextColor="#94a3b8"
                    value={arrivalLocation}
                    onChangeText={setArrivalLocation}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-slate-100 mb-5" />

          {/* Odometer Readings — inline start ref + end input */}
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center gap-2">
              <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center">
                <Ionicons name="speedometer-outline" size={18} color="#1B71E2" />
              </View>
              <View>
                <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">Start Reading</Text>
                <Text className="text-slate-900 font-black text-sm">{Number(trip?.start_mileage ?? 0).toLocaleString()} <Text className="text-slate-400 text-[10px] font-normal">km</Text></Text>
              </View>
            </View>

            <Ionicons name="arrow-forward" size={16} color="#cbd5e1" />

            <View className="items-end">
              <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-1">End Reading <Text className="text-red-500">*</Text></Text>
              <View className="bg-slate-50 flex-row items-center px-3 py-2 rounded-xl border border-slate-200">
                <TextInput
                  className="text-slate-900 font-bold text-sm p-0 min-w-[72px] text-right"
                  placeholder="e.g. 15250"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                  value={endMileage}
                  onChangeText={setEndMileage}
                />
                <Text className="text-slate-400 text-xs font-bold ml-1">km</Text>
              </View>
            </View>
          </View>

          <ImageUpload
            image={endImage}
            onImageSelect={setEndImage}
            label="End Odometer Proof"
          />
        </View>

        <TouchableOpacity
          onPress={handleEndTrip}
          disabled={isEnding || isUploading || !arrivalLocation.trim() || !endMileage.trim()}
          activeOpacity={0.9}
          className={`${isEnding || isUploading || !arrivalLocation.trim() || !endMileage.trim() ? "bg-slate-300" : "bg-primary"} py-4 rounded-2xl flex-row items-center justify-center mb-24 shadow-lg shadow-primary/30`}
        >
          {isEnding || isUploading ? (
            <View className="flex-row items-center">
              <ActivityIndicator color="white" size="small" className="mr-2" />
              <Text className="text-white font-bold">{isUploading ? "Uploading Proof..." : "Ending Trip..."}</Text>
            </View>
          ) : (
            <>
              <Ionicons name="stop-circle" size={20} color="white" />
              <Text className="text-white font-bold ml-2 text-lg">End Trip</Text>
            </>
          )}
        </TouchableOpacity>
      </ScreenWrapper>
    </View>
  );
}
