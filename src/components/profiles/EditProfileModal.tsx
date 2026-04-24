import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EditProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialPhone: string;
  initialSkills: string[];
  onSave: (phone: string, skills: string[]) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isVisible,
  onClose,
  initialPhone,
  initialSkills,
  onSave,
}) => {
  const insets = useSafeAreaInsets();
  const [phone, setPhone] = useState(initialPhone);
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="bg-white rounded-t-[40px] px-6 pt-8"
          style={{ paddingBottom: insets.bottom + 20, maxHeight: '90%' }}
        >
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-slate-900 text-2xl font-black">Edit Profile</Text>
              <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Update your information</Text>
            </View>
            <TouchableOpacity 
              onPress={onClose}
              className="w-10 h-10 bg-slate-100 rounded-full items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#1e293b" />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="mb-6">
            <View className="mb-6">
              <Text className="text-slate-900 font-bold mb-3 ml-1">Phone Number</Text>
              <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
                <Ionicons name="call-outline" size={20} color="#94a3b8" />
                <TextInput
                  className="flex-1 px-3 text-slate-900 font-medium"
                  placeholder="+1 234 567 890"
                  placeholderTextColor="#94a3b8"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-slate-900 font-bold mb-3 ml-1">Skills & Services</Text>
              <View className="flex-row flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <View key={index} className="bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20 flex-row items-center">
                    <Text className="text-primary text-xs font-bold mr-2">{skill}</Text>
                    <TouchableOpacity onPress={() => handleRemoveSkill(index)}>
                      <Ionicons name="close-circle" size={14} color="#1B71E2" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View className="bg-slate-50 flex-row items-center px-4 h-14 rounded-2xl border border-slate-100">
                <TextInput
                  className="flex-1 px-3 text-slate-900 font-medium"
                  placeholder="Add a skill..."
                  placeholderTextColor="#94a3b8"
                  value={newSkill}
                  onChangeText={setNewSkill}
                  onSubmitEditing={handleAddSkill}
                />
                <TouchableOpacity onPress={handleAddSkill}>
                  <Ionicons name="add-circle" size={24} color="#1B71E2" />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity 
            onPress={() => onSave(phone, skills)}
            className="bg-primary py-4 rounded-2xl items-center justify-center shadow-lg shadow-primary/30"
          >
            <Text className="text-white font-black text-lg">Save Changes</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};
