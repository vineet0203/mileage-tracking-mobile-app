import { getMe } from "@/src/api/auth";
import { ACCESS_TOKEN_KEY } from "@/src/constants/app";
import { useAuthStore } from "@/src/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    async function prepareApp() {
      try {
        const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

        if (token) {
          try {
            const user = await getMe();
            setUser(user);
          } catch (e) {
            console.warn("Failed to fetch user:", e);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (e) {
        console.warn("Error preparing app:", e);
      } finally {
        // Hide splash screen after initialization
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, [setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
