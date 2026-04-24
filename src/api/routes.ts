import { BackendResponse, TravelRoute } from "../types/api";
import { apiClient } from "./apiClient";

export const getRoutes = async (): Promise<TravelRoute[]> => {
  const { data } = await apiClient.get<BackendResponse<TravelRoute[]>>("/routes");
  return data.data;
};
