import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { TextInput, View } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search trips...",
  onSearch,
  debounceTime = 500,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [value, debounceTime, onSearch]);

  return (
    <View className="flex-1 bg-white flex-row items-center px-4 rounded-2xl border border-slate-100 shadow-sm h-14">
      <Ionicons name="search-outline" size={20} color="#94a3b8" />
      <TextInput
        className="flex-1 ml-2 text-slate-700 font-medium"
        placeholder={placeholder}
        placeholderTextColor="#94a3b8"
        value={value}
        onChangeText={setValue}
      />
    </View>
  );
};
