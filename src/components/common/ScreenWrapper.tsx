import React from "react";
import { ScrollView, View, ViewStyle } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
  keyboardAware?: boolean;
  withTabBar?: boolean;
  noPadding?: boolean;
  className?: string;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle | ViewStyle[];
  showsVerticalScrollIndicator?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  scrollable = false,
  keyboardAware = false,
  withTabBar = false,
  noPadding = false,
  className = "",
  style,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
}) => {
  const insets = useSafeAreaInsets();

  const bottomPadding = withTabBar
    ? 110 + insets.bottom
    : Math.max(insets.bottom, 20);

  const containerStyle: ViewStyle = {
    paddingBottom: bottomPadding,
    paddingHorizontal: noPadding ? 0 : 8,
    paddingTop: noPadding ? 0 : 10,
  };

  if (keyboardAware) {
    return (
      <KeyboardAwareScrollView
        className={`flex-1 ${className}`}
        style={style}
        contentContainerStyle={[containerStyle, contentContainerStyle]}
        // showsVerticalScrollIndicator={showsVerticalScrollIndicator}
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
