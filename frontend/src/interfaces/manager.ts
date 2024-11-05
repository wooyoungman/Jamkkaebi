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
  // location: {
  //   lat: number;
  //   lng: number;
  // };
  region: string;
  status: "운행 중" | "휴일";
  profileImage: string;
}

export interface DrowsyEvent {
  id: string;
  profileImage: string;
  driverName: string;
  age: number;
  gender: string;
  timestamp: string;
  location: {
    lat: number;
    lng: number;
  };
  // 졸음 횟수, 시간, 피로도 데이터
  drowsyCount: number; // 1회
  drowsyTime: number; // 초 단위
  fatigueLevel: "양호" | "보통" | "강함";
}
