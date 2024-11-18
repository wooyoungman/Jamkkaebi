export interface User {
  memberType: "MANAGER" | "DRIVER" | "ADMIN";
  memberId: number;
  memberName: string;
  additionalInfo: null | string;
}

export interface DriverDetails {
  phoneNumber: string | null;
  region: string | null;
  vehicleNumber: string;
  status: "ON_ROUTE" | "REST" | "IDLE";
  profileImage: string;
}

export type Driver = User & DriverDetails;

export interface DriverResponse {
  driverId: number;
  driverName: string;
  phoneNumber: string | null;
  region: string | null;
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
    region: res.region,
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

// 실시간 데이터만을 위한 간단한 타입
export interface RealTimeDriver extends DriverResponse {
  location: {
    lat: number;
    lng: number;
  };
  route: Array<{
    lat: number;
    lng: number;
  }>;
}

// 경로 정보의 좌표와 feature 타입
export interface Coordinate {
  type: "Point" | "LineString";
  coordinates: number[] | number[][]; // Point일 경우 number[], LineString일 경우 number[][]
}

export interface PointProperties {
  index: number;
  pointIndex: number;
  pointType: "S" | "E";
  totalDistance?: number; // 시작점에만 있는 속성
}

export interface LineProperties {
  index: number;
  lineIndex: number;
  distance: number;
}

// 주간 데이터를 위한 공통 타입
export interface WeeklyData {
  lastWeek: (number | null)[];
  thisWeek: (number | null)[];
}

export interface ReportDriverInfo {
  driverName: string;
  vehicleNumber: string;
  phoneNumber: string;
  region: string;
  status: DriverDetails["status"]; // 기존 status 타입 재사용
}

export interface ReportData {
  driverInfo: ReportDriverInfo;
  distance: WeeklyData;
  driveTime: WeeklyData;
  avgSleepIndex: WeeklyData;
  eegData: WeeklyData;
}

export interface Feature {
  type: string;
  geometry: Coordinate;
  properties: PointProperties | LineProperties;
}

// geoJSON 형식
export interface FeatureCollection {
  type: string;
  features: Feature[]; // 경로의 각 구간
}

export interface DeliveryRecord {
  deliveryId: number;
  driverId: number;
  driverName: string; // 추가
  routeId: string;
  cargoId: number;
  origin: string;
  destination: string;
  length: number;
  departureDate: string;
  arrivalDate: string | null;
  sleepSector: number;
  route_info: FeatureCollection;
  route_sleep: FeatureCollection | null;
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
  region: string;
  phoneNumber: string;
  profileImage: string;
}

export interface RegisterResponse {
  name: string;
  username: string;
  registerDate: string;
}

export interface DrowsyEvent {
  id: number;
  username: string; // 아이디
  profileImage: string;
  driverName: string;
  age: number;
  gender: string;
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

export interface Location {
  lat: number;
  lng: number;
}

export interface AlertInfo {
  driverName: string;
  eventTime: string;
  eventLocation: {
    lat: number;
    lng: number;
  };
}