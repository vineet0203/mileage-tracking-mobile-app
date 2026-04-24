import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

interface OtpInputProps {
  onCodeFilled: (code: string) => void;
  value: string;
  setValue: (value: string) => void;
}

export const OtpInput: React.FC<OtpInputProps> = ({ onCodeFilled, value, setValue }) => {
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View className="mb-8 w-full px-4">
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={(text) => {
          setValue(text);
          if (text.length === CELL_COUNT) {
            onCodeFilled(text);
          }
        }}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            onLayout={getCellOnLayoutHandler(index)}
            className={`w-12 h-16 border-2 rounded-2xl items-center justify-center bg-white shadow-sm ${
              isFocused ? "border-primary bg-blue-50/30" : "border-slate-100"
            }`}
          >
            <Text className={`text-2xl font-bold ${isFocused ? "text-primary" : "text-slate-900"}`}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 10,
    justifyContent: "space-between",
  },
});
