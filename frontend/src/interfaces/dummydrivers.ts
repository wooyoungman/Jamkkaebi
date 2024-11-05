import { User, DrowsyEvent, LoginRequest } from "./manager";

// User 데이터
export const dummyUsers: User[] = [
  {
    id: "DRV001",
    name: "김운전",
    role: "driver",
    phone: "010-1234-5678",
    employeeId: "EMP001",
    region: "서울",
    status: "운행 중",
    profileImage: "/images/profile1.jpg",
  },
  {
    id: "DRV002",
    name: "이안전",
    role: "driver",
    phone: "010-2345-6789",
    employeeId: "EMP002",
    region: "경기",
    status: "휴일",
    profileImage: "/images/profile2.jpg",
  },
];

// 졸음운전 이벤트 데이터
export const dummyDrowsyEvents: DrowsyEvent[] = [
  {
    id: "EVENT001",
    profileImage: "/images/profile1.jpg",
    driverName: "김운전",
    age: 45,
    gender: "남성",
    timestamp: "2024-03-05 14:30:00",
    location: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    drowsyCount: 1,
    drowsyTime: 3, // 3초
    fatigueLevel: "보통",
  },
  {
    id: "EVENT002",
    profileImage: "/images/profile2.jpg",
    driverName: "이안전",
    age: 38,
    gender: "남성",
    timestamp: "2024-03-05 14:28:00",
    location: {
      lat: 37.5208085,
      lng: 127.1076804,
    },
    drowsyCount: 1,
    drowsyTime: 2, // 2초
    fatigueLevel: "양호",
  },
];

// 로그인 테스트용 데이터
export const dummyLoginRequests: LoginRequest[] = [
  {
    id: "driver1",
    password: "password123",
  },
  {
    id: "manager1",
    password: "password123",
  },
];
