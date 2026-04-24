import { useQuery } from "@tanstack/react-query";
import { getRoutes } from "../api/routes";

export const ROUTE_KEYS = {
  all: ["routes"] as const,
};

export function useRoutes() {
  return useQuery({
    queryKey: ROUTE_KEYS.all,
    queryFn: getRoutes,
  });
}
