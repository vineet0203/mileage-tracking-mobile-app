
//  User shape returned by GET /auth/me and POST /auth/login
export interface User {
  id: number;
  email: string;
  fullname: string;
  role: "ADMIN" | "MANAGER" | "EMPLOYEE";
  designation: string | null;
  ssn: string | null;
  phone: string | null;
  organization_id: number | null;
  organization_name: string | null;
  manager_id: number | null;
  manager_name: string | null;
  is_verified: number;
  joined_date: string | null;   // users.created_at aliased as joined_date
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
  status: number;
  data: T;
  message: string;
  error: string | null;
}


//  Travel Route shape
export interface TravelRoute {
  id: number;
  name: string;
  description: string | null;
  rate: number;
  organization_id: number;
}

//  Trip status enum-like strings
export type TripStatus = 'IN_PROGRESS' | 'COMPLETED_PENDING' | 'APPROVED' | 'REJECTED';

//  Trip shape
export interface Trip {
  id: number;
  title: string;
  description: string | null;
  user_id: number;
  employee_name?: string;
  organization_id: number;
  route_id: number;
  route_name: string;
  route_rate: number;
  start_time: string;
  end_time: string | null;
  start_location_address: string;
  end_location_address: string | null;
  start_odometer_img: string | null;
  end_odometer_img: string | null;
  status: TripStatus;
  start_mileage: number;
  end_mileage: number | null;
  distance: number;
  total_price: number;
  created_at: string;
}

//  Trip Stats shape
export interface TripStats {
  total_trips: number;
  total_mileage: string | number;
  total_income: string | number;
  month_distance: string | number;
  month_income: string | number;
}

