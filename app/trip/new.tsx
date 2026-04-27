import { uploadImage } from "@/src/api/uploads";
import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { ImageUpload } from "@/src/components/ImageUpload";
import { getApiErrorMessage } from "@/src/hooks/useAuth";
import { useRoutes } from "@/src/hooks/useRoutes";
import { useStartTripMutation } from "@/src/hooks/useTrips";
import { TravelRoute } from "@/src/types/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Alert, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewTripScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const { data: routes, isLoading: routesLoading } = useRoutes();
  const { mutate: startTrip, isPending: isStarting } = useStartTripMutation();

  const [selectedRoute, setSelectedRoute] = useState<TravelRoute | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [startMileage, setStartMileage] = useState("");
  const [showRoutesModal, setShowRoutesModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRoutes = useMemo(() => {
    if (!routes) return [];
    return routes.filter(route =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [routes, searchQuery]);

  const [isUploading, setIsUploading] = useState(false);

  const handleStartTrip = async () => {
    if (!title.trim() || !selectedRoute || !startLocation.trim()) return;
    const parsedMileage = parseFloat(startMileage);
    if (isNaN(parsedMileage) || parsedMileage < 0) {
      Alert.alert("Error", "Please enter a valid start mileage.");
      return;
    }

    let start_odometer_img = undefined;
    
    try {
      if (image) {
        setIsUploading(true);
        start_odometer_img = await uploadImage(image);
      }

      startTrip({
        title: title.trim(),
        description: description.trim(),
        route_id: selectedRoute.id,
        start_location_address: startLocation.trim(),
        start_mileage: parsedMileage,
        start_odometer_img,
      }, {
        onSuccess: () => {
          Alert.alert("Success", "Trip started successfully!");
          router.replace("/(tabs)/trips");
        },
        onError: (err) => {
          Alert.alert("Error", getApiErrorMessage(err, "Failed to start trip."));
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

  const isFormValid =
    title.trim().length > 0 &&
    selectedRoute !== null &&
    startLocation.trim().length > 0 &&
    startMileage.trim().length > 0 &&
    !isNaN(parseFloat(startMileage)) &&
    parseFloat(startMileage) >= 0;

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header
        title="Start New Trip"
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
        noPadding={true}
        className="pt-2 px-4"
      >
        {/* Trip Title - REQUIRED */}
        <View className="mb-5">
          <View className="flex-row items-center mb-2 ml-1">
            <Text className="text-slate-900 font-bold">Trip Title</Text>
            <Text className="text-red-500 ml-1">*</Text>
          </View>
          <TextInput
            className={`bg-white px-4 py-2 rounded-2xl border ${!title && title.length === 0 ? "border-slate-100" : "border-primary/20"} shadow-sm text-slate-900 font-medium`}
            placeholder="e.g. Morning Commute"
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Route Selection - Modal Based */}
        <View className="mb-5">
          <Text className="text-slate-900 font-bold mb-2 ml-1">Select Route</Text>
          <TouchableOpacity
            onPress={() => setShowRoutesModal(true)}
            activeOpacity={0.7}
            className="bg-white px-4 py-3 rounded-2xl border border-slate-100 flex-row justify-between items-center shadow-sm"
          >
            <View className="flex-row items-center">
              <Ionicons name="map-outline" size={18} color={selectedRoute ? "#1B71E2" : "#94a3b8"} className="mr-2" />
              <Text className={selectedRoute ? "text-slate-900 font-medium" : "text-slate-400"}>
                {selectedRoute ? selectedRoute.name : "Choose a route..."}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* Auto-filled Mileage */}
        {selectedRoute && (
          <View className="mb-5 bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex-row items-center">
            <View className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-3 shadow-sm">
              <Ionicons name="speedometer" size={20} color="#1B71E2" />
            </View>
            <View>
              <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Mileage Rate</Text>
              <Text className="text-primary text-lg font-black">${selectedRoute.rate} / km</Text>
            </View>
          </View>
        )}

        <View className="mb-5">
          <Text className="text-slate-900 font-bold mb-2 ml-1">Start Location</Text>
          <View className="bg-white flex-row items-center px-4 rounded-2xl border border-slate-100 shadow-sm">
            <Ionicons name="location-outline" size={18} color="#1B71E2" />
            <TextInput
              className="flex-1 px-3 py-2 text-slate-900 font-medium"
              placeholder="Enter start address"
              placeholderTextColor="#94a3b8"
              value={startLocation}
              onChangeText={setStartLocation}
            />
          </View>
        </View>

        {/* Start Mileage - REQUIRED */}
        <View className="mb-5">
          <View className="flex-row items-center mb-2 ml-1">
            <Text className="text-slate-900 font-bold">Start Odometer Reading</Text>
            <Text className="text-red-500 ml-1">*</Text>
          </View>
          <View className="bg-white flex-row items-center px-4 rounded-2xl border border-slate-100 shadow-sm">
            <Ionicons name="speedometer-outline" size={18} color="#1B71E2" />
            <TextInput
              className="flex-1 px-3 py-2 text-slate-900 font-medium"
              placeholder="e.g. 15200"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={startMileage}
              onChangeText={setStartMileage}
            />
            <Text className="text-slate-400 text-xs font-bold">km</Text>
          </View>
        </View>

        <View className="mb-5">
          <Text className="text-slate-900 font-bold mb-2 ml-1">Description (Optional)</Text>
          <TextInput
            className="bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm text-slate-900 font-medium min-h-[80px]"
            placeholder="Add trip notes..."
            placeholderTextColor="#94a3b8"
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Image Upload */}
        <ImageUpload
          image={image}
          onImageSelect={setImage}
          label="Starting Odometer Proof"
        />

        {/* Start Button */}
        <TouchableOpacity
          onPress={handleStartTrip}
          disabled={!isFormValid || isStarting || isUploading}
          activeOpacity={0.9}
          className={`${isFormValid && !isStarting && !isUploading ? "bg-primary" : "bg-slate-300"} py-4 rounded-2xl flex-row items-center justify-center mb-24 shadow-lg ${isFormValid ? "shadow-primary/30" : ""}`}
        >
          {isStarting || isUploading ? (
            <View className="flex-row items-center">
              <ActivityIndicator color="white" size="small" className="mr-2" />
              <Text className="text-white font-bold">{isUploading ? "Uploading Proof..." : "Starting Trip..."}</Text>
            </View>
          ) : (
            <>
              <Ionicons name="play" size={20} color="white" />
              <Text className="text-white font-bold ml-2 text-lg">Start Trip</Text>
            </>
          )}
        </TouchableOpacity>
      </ScreenWrapper>

      {/* Routes Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRoutesModal}
        onRequestClose={() => setShowRoutesModal(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
          <Pressable className="absolute inset-0" onPress={() => setShowRoutesModal(false)} />
          <View
            className="bg-white rounded-t-[40px] px-6 pt-6 pb-10"
            style={{ maxHeight: '80%', paddingBottom: insets.bottom + 20 }}
          >
            <View className="flex-row justify-between items-center mb-6">
              <View>
                <Text className="text-slate-900 font-black text-2xl">Select Route</Text>
                <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Choose your destination</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowRoutesModal(false)}
                className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#1e293b" />
              </TouchableOpacity>
            </View>

            <View className="bg-slate-50 flex-row items-center px-4 rounded-2xl mb-6">
              <Ionicons name="search" size={18} color="#94a3b8" />
              <TextInput
                className="flex-1 p-3 text-slate-900 font-medium"
                placeholder="Search routes..."
                placeholderTextColor="#94a3b8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {routesLoading ? (
              <ActivityIndicator color="#1B71E2" size="large" className="py-10" />
            ) : (
              <ScrollView showsVerticalScrollIndicator={false}>
                {filteredRoutes.map((route) => (
                  <TouchableOpacity
                    key={route.id}
                    onPress={() => {
                      setSelectedRoute(route);
                      setShowRoutesModal(false);
                      setSearchQuery("");
                    }}
                    className={`p-4 mb-3 rounded-2xl border ${selectedRoute?.id === route.id ? "bg-blue-50 border-primary" : "bg-white border-slate-100"} flex-row justify-between items-center`}
                  >
                    <View className="flex-1 mr-4">
                      <Text className={`font-bold ${selectedRoute?.id === route.id ? "text-primary" : "text-slate-900"}`}>{route.name}</Text>
                      <Text className="text-slate-400 text-[10px] font-bold uppercase mt-1">Frequent Route</Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-slate-900 font-black">${route.rate} / km</Text>
                      <Ionicons name="chevron-forward" size={14} color="#94a3b8" className="mt-1" />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
