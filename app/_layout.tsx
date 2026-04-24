import { getMe } from "@/src/api/auth";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/src/constants/app";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1_000,
    },
  },
});

function InitialLayout() {
  const { isAuthenticated, isLoading, setUser, logout } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    async function prepareApp() {
      try {
        const [accessToken, refreshToken] = await Promise.all([
          SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
          SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
        ]);

        if (accessToken && refreshToken) {
          try {
            // apiClient interceptor will auto-refresh if accessToken is expired
            const user = await getMe();
            setUser(user);
          } catch (err) {
            console.error("[boot] getMe failed:", err);
            // Both tokens invalid — full logout
            await logout();
          }
        } else {
          // No tokens at all
          await logout();
        }
      } catch (err) {
        console.error("[boot] prepareApp fatal error:", err);
        await logout();
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments.length > 0 && segments[0] === "(auth)";
    const atRoot = (segments as string[]).length === 0;

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (isAuthenticated && (inAuthGroup || atRoot)) {
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

