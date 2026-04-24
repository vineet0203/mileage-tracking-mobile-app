import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: any;
  showNotification?: boolean;
  leftElement?: React.ReactNode;
  rightActions?: Array<{
    icon: any;
    onPress: () => void;
    label?: string;
    isPrimary?: boolean;
  }>;
  variant?: "dashboard" | "default";
  hasCurve?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  icon,
  showNotification = true,
  leftElement,
  rightActions = [],
  variant = "default",
  hasCurve = true,
}) => {
  return (
    <View 
      className={`bg-primary pt-14 px-6 ${hasCurve ? "rounded-b-3xl" : ""} shadow-lg z-10`}
    >
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1 flex-row items-center">
          {leftElement}
          {icon && (
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3 border border-white/10">
              <Ionicons name={icon} size={20} color="white" />
            </View>
          )}
          <View>
            {variant === "dashboard" ? (
              <>
                <Text className="text-white/80 text-xs font-medium uppercase tracking-wider">
                  Welcome back,
                </Text>
                <Text className="text-white text-xl font-bold">{title}</Text>
              </>
            ) : (
              <Text className="text-white text-2xl font-bold">{title}</Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center gap-x-2">
          {rightActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              onPress={action.onPress}
              className={`${action.isPrimary
                ? "bg-white px-3 py-1.5 rounded-xl flex-row items-center"
                : "w-10 h-10 bg-white/20 rounded-xl items-center justify-center"
                }`}
            >
              <Ionicons
                name={action.icon}
                size={action.isPrimary ? 16 : 20}
                color={action.isPrimary ? "#1B71E2" : "white"}
              />
              {action.isPrimary && action.label && (
                <Text className="text-primary font-bold ml-1.5 text-xs">
                  {action.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}

          {showNotification && (
            <TouchableOpacity className="w-10 h-10 bg-white/20 rounded-xl items-center justify-center">
              <Ionicons name="notifications-outline" size={22} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {subtitle && (
        <Text className="text-white/80 text-sm">{subtitle}</Text>
      )}
    </View>
  );
};
