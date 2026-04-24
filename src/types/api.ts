
//  User shape returned by GET /auth/me and POST /auth/login
export interface User {
  id: number;
  email: string;
  fullname: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  organization_id: number | null;
  organization_name: string | null;
  manager_id: number | null;
}

//  Auth token pair
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

//  POST /auth/login response data
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

//  Generic backend envelope  { statusCode, data, message, error }
export interface BackendResponse<T> {
  statusCode: number;
  data: T;
  message: string;
  error: string | null;
}

