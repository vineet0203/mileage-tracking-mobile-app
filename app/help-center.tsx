import { ScreenWrapper } from "@/src/components/common/ScreenWrapper";
import { Header } from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";

export default function HelpCenterScreen() {
  const router = useRouter();

  const faqs = [
    {
      question: "How do I track a new trip?",
      answer: "Go to the 'Trips' tab and tap the 'Start New' button. Fill in the details and tap 'Start Trip'."
    },
    {
      question: "Can I edit a completed trip?",
      answer: "Yes, you can edit trip details from the Trip History list by selecting the specific trip."
    },
    {
      question: "How is mileage calculated?",
      answer: "Mileage is calculated based on the starting and ending odometer readings you provide."
    },
    {
      question: "Where can I see my monthly reports?",
      answer: "Your monthly activity summary is available on the main Dashboard screen."
    }
  ];

  return (
    <View className="flex-1 bg-[#f8fafc]">
      <Header
        title="Help Center"
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

      <ScreenWrapper noPadding={true} scrollable={true} className="px-4 pt-6">
        <View className="mb-8">
          <Text className="text-slate-900 text-2xl font-black mb-2">How can we help?</Text>
          <Text className="text-slate-400 text-sm">Find answers to common questions or contact our support team.</Text>
        </View>

        <View className="gap-y-4 mb-10">
          {faqs.map((faq, index) => (
            <View key={index} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
              <Text className="text-slate-900 font-bold mb-2">{faq.question}</Text>
              <Text className="text-slate-500 text-sm leading-5">{faq.answer}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          className="bg-primary h-14 rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/30 mb-10"
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="white" />
          <Text className="text-white font-black ml-2">Contact Support</Text>
        </TouchableOpacity>
      </ScreenWrapper>
    </View>
  );
}
