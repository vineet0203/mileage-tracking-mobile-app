import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  style?: ViewStyle | ViewStyle[];
  scrollable?: boolean;
  keyboardAware?: boolean;
  withTabBar?: boolean;
  className?: string;
  showsVerticalScrollIndicator?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  contentContainerStyle,
  style,
  scrollable = true,
  keyboardAware = false,
  withTabBar = false,
  className = "",
  showsVerticalScrollIndicator = false,
}) => {
  const insets = useSafeAreaInsets();

  const bottomPadding = withTabBar
    ? 110 + insets.bottom
    : Math.max(insets.bottom, 20);

  const containerStyle: ViewStyle = {
    paddingBottom: bottomPadding,
    paddingHorizontal: 16,
    paddingTop: 10,
  };

  if (keyboardAware) {
    return (
      <KeyboardAwareScrollView
        className={`flex-1 ${className}`}
        style={style}
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  }

  if (scrollable) {
    return (
      <ScrollView
        className={`flex-1 ${className}`}
        style={style}
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyboardShouldPersistTaps="handled"
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      className={`flex-1 ${className}`}
      style={[style, { paddingBottom: bottomPadding }]}
    >
      {children}
    </View>
  );
};
