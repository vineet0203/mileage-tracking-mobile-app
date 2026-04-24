export interface User {
  id: number;
  email: string | null;
  phone: string | null;
  name: string | null;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  data: T;
  error: boolean;
  message: string;
  statusCode: number;
}
