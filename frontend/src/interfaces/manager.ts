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
  status: "ON_ROUTE" | "REST" | "IDLE";
  profileImage: string;
}

export interface DriverList {
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
    status: res.status,
    profileImage: res.profileImage,
  };
};

export interface Location {
  lat: number;
  lng: number;
}

export interface DrowsyEvent {
  id: number;
  username: string;
  profileImage: string;
  driverName: string;
  age: number;
  timestamp: string;
  location: Location;
  drowsyCount: number;
  drowsyTime: number;
  fatigueLevel: "양호" | "보통" | "강함";
  route: MapDriver["route"];
}

export interface MapDriver {
  id: number;
  username: string;
  name: string;
  vehicleNumber: string;
  status: string;
  location: Location;
  lastLocation: string;
  route: Location[];
  sleepEvents: number;
  lastUpdate: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  memberId: number;
  grantType: string;
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
