import { BackendResponse } from "../types/api";
import { apiClient } from "./apiClient";

export interface UploadResponse {
  url: string;
}

export const uploadImage = async (uri: string): Promise<string> => {
  const formData = new FormData();

  // Extract file extension
  const uriParts = uri.split('.');
  const fileType = uriParts[uriParts.length - 1];

  // @ts-ignore
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  const { data } = await apiClient.post<BackendResponse<UploadResponse>>(
    "/uploads/image",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.data.url;
};
