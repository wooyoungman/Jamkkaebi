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

export interface User {
  id: number;
  username: string; // 아이디
  name: string;
  role?: "manager" | "driver" | "admin";
  phone: string;
  employeeId: string;
  region: string;
  status: "운행 중" | "휴일";
  profileImage: string;
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
