// src/interfaces/manager.ts

export interface LoginRequest {
  id: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  role: "manager" | "driver";
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
  id: string;
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
  id: string;
  name: string;
  vehicleNumber: string;
  status: string;
  location: Location;
  lastLocation: string;
  route: Location[];
  sleepEvents: number;
  lastUpdate: string;
}
