import { BackendResponse, Trip, TripStats } from "../types/api";
import { apiClient } from "./apiClient";

export interface StartTripPayload {
  title: string;
  description?: string;
  route_id: number;
  start_location_address: string;
  start_odometer_img?: string;
}

export interface EndTripPayload {
  end_location_address: string;
  end_odometer_img?: string;
}

export const getTrips = async (params?: { status?: string; page?: number; limit?: number }): Promise<Trip[]> => {
  const { data } = await apiClient.get<BackendResponse<Trip[]>>("/trips", { params });
  return data.data;
};

export const getTripDetails = async (id: number): Promise<Trip> => {
  const { data } = await apiClient.get<BackendResponse<Trip>>(`/trips/${id}`);
  return data.data;
};

export const startTrip = async (payload: StartTripPayload): Promise<{ id: number }> => {
  const { data } = await apiClient.post<BackendResponse<{ id: number }>>("/trips/start", payload);
  return data.data;
};

export const endTrip = async (id: number, payload: EndTripPayload): Promise<void> => {
  await apiClient.put<BackendResponse<null>>(`/trips/${id}/end`, payload);
};

export const getTripStats = async (): Promise<TripStats> => {
  const { data } = await apiClient.get<BackendResponse<TripStats>>("/trips/stats");
  return data.data;
};

