export interface User {
  memberType: "MANAGER" | "DRIVER" | "ADMIN";
  memberId: number;
  memberName: string;
  additionalInfo: null | string;
}

export interface DriverDetails {
  phoneNumber: string | null;
  address: string | null;
  vehicleNumber: string;
  status: "ON_ROUTE" | "REST" | "IDLE";
  profileImage: string;
}

export type Driver = User & DriverDetails;

export interface DriverResponse {
  driverId: number;
  driverName: string;
  phoneNumber: string | null;
  address: string | null;
  role: "DRIVER";
  vehicleNumber: string;
  status: "ONROUTE" | "REST" | "IDLE";
  profileImage: string;
}

// API 응답 구조
export interface ApiResponse<T> {
  status: number;
  message: string;
  timestamp: string;
  data: T;
}

export interface ApiDriverList {
  count: number;
  driversType: "UNMANAGED" | "MANAGED";
  drivers: DriverResponse[];
}

export const convertToDriver = (res: DriverResponse): Driver => {
  return {
    memberId: res.driverId,
    memberName: res.driverName,
    memberType: "DRIVER",
    additionalInfo: null,
    phoneNumber: res.phoneNumber,
    address: res.address,
    vehicleNumber: res.vehicleNumber,
    status: res.status === "ONROUTE" ? "ON_ROUTE" : res.status,
    profileImage: res.profileImage,
  };
};

export interface DriverList {
  count: number;
  driversType: "UNMANAGED" | "MANAGED";
  drivers: Driver[];
}

export interface Location {
  lat: number;
  lng: number;
}

export interface DrowsyEvent {
  id: number;
  username: string; // 아이디
  profileImage: string;
  driverName: string;
  age: number;
  timestamp: string;
  location: Location;
  drowsyCount: number;
  drowsyTime: number;
  fatigueLevel: "양호" | "보통" | "강함";
  route: MapDriver["route"]; // MapDriver의 route 타입을 재사용
}

export interface MapDriver {
  id: number;
  username: string; // 아이디
  name: string;
  vehicleNumber: string;
  status: string;
  location: Location;
  lastLocation: string;
  route: Location[];
  sleepEvents: number;
  lastUpdate: string;
}

export interface RegisterRequest {
  username: string; // 아이디
  password: string; // 비밀번호
  name: string; // 사용자 이름
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  memberId: number;
  grantType: string; // "Bearer"
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  password: string;
  email?: string;
}

export interface RegisterResponse {
  name: string;
  username: string;
  registerDate: string;
}
