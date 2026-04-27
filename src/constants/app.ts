export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

/**
 * API base URL — pick the right one for your setup:
 *
 *  Physical device (Expo Go, same Wi-Fi) → machine LAN IP
 *  Android emulator                       → http://10.0.2.2:5000
 *  iOS simulator                          → http://localhost:5000
 *  Production                             → https://api.mileage.trakjobs.com
 */
// export const API_BASE_URL = "http://10.0.2.2:5000";        // Android emulator
// export const API_BASE_URL = "http://localhost:5000";        // iOS simulator
// export const API_BASE_URL = "https://api.mileage.trakjobs.com"; // Production
export const API_BASE_URL = "http://10.250.201.23:5001"; // Production
