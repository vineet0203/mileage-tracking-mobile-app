import { getMe } from "@/src/api/auth";
import { ACCESS_TOKEN_KEY } from "@/src/constants/app";
import { useAuthStore } from "@/src/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function InitialLayout() {
  const { isAuthenticated, isLoading, setUser } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

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

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments.length > 0 && segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, segments, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <InitialLayout />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
