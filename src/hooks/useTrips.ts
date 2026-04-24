import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endTrip, EndTripPayload, getTripDetails, getTrips, startTrip, StartTripPayload, getTripStats } from "../api/trips";

export const TRIP_KEYS = {
  all: ["trips"] as const,
  list: (params?: any) => ["trips", "list", params] as const,
  detail: (id: number) => ["trips", "detail", id] as const,
};

export function useTrips(params?: { status?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: TRIP_KEYS.list(params),
    queryFn: () => getTrips(params),
  });
}

export function useTripDetails(id: number) {
  return useQuery({
    queryKey: TRIP_KEYS.detail(id),
    queryFn: () => getTripDetails(id),
    enabled: !!id,
  });
}

export function useStartTripMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: StartTripPayload) => startTrip(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
    },
  });
}

export function useEndTripMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: EndTripPayload }) => endTrip(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.all });
      queryClient.invalidateQueries({ queryKey: TRIP_KEYS.detail(variables.id) });
    },
  });
}

export function useTripStats() {
  return useQuery({
    queryKey: ["trips", "stats"],
    queryFn: getTripStats,
  });
}

