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

export interface DriverState {
  driverId: number;
  drowsy_level: number;
  concentration_level: number;
}

export interface BrainData {
  driverId: number;
  predictions?: {
    classification: "NORMAL" | "ASLEEP";
  };
  coordinate: number[];
}

// 경로 정보의 좌표와 feature 타입
export interface Coordinate {
  type: string;
  coordinates: number[] | number[][]; // lat, lng
}

export interface Feature {
  type: string;
  geometry: Coordinate;
  properties: {
    index: number;
    pointIndex?: number;
    lineIndex?: number;
    pointType?: string;
    distance?: number;
    totalDistance?: number;
  };
}

// geoJSON 형식
export interface FeatureCollection {
  type: string;
  features: Feature[]; // 경로의 각 구간
}

export interface DeliveryRecord {
  deliveryId: number;
  driverId: number; // --> Driver랑 연결
  routeId: string;
  cargoId: number;
  origin: string;
  destination: string;
  length: number;
  departureDate: string;
  arrivalDate: string;
  focusSector: number;
  sleepSector: number;
  route_info: FeatureCollection;
  route_sleep: FeatureCollection; // 졸음 구간
  route_low_focus: FeatureCollection; // 집중도 낮은 구간
}

export interface DriverWithRoute extends DriverResponse {
  location: {
    lat: number;
    lng: number;
  };
  route: Array<{
    lat: number;
    lng: number;
  }>;
  deliveryInfo: DeliveryRecord;
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
}

export interface RegisterResponse {
  name: string;
  username: string;
  registerDate: string;
}
