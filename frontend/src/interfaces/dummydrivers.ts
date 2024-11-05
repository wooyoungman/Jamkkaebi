import { User, DrowsyEvent, LoginRequest, MapDriver } from "./manager";

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
    drowsyTime: 3,
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
    drowsyTime: 2,
    fatigueLevel: "양호",
  },
];

// 지도 표시용 운전자 데이터
export const dummyMapDrivers: MapDriver[] = [
  {
    id: "DRV001",
    name: "김운전",
    vehicleNumber: "서울 123가 4567",
    status: "운행중",
    location: {
      lat: 37.5666805,
      lng: 126.9784147,
    },
    lastLocation: "서울시 중구 세종대로 110",
    route: [
      { lat: 37.5666805, lng: 126.9784147 },
      { lat: 37.5668805, lng: 126.9786147 },
      { lat: 37.5670805, lng: 126.9788147 },
      { lat: 37.5672805, lng: 126.9790147 },
    ],
    sleepEvents: 2,
    lastUpdate: "2024-03-05 14:30:00",
  },
  {
    id: "DRV002",
    name: "이안전",
    vehicleNumber: "서울 456나 7890",
    status: "운행중",
    location: {
      lat: 37.5208085,
      lng: 127.1076804,
    },
    lastLocation: "서울시 송파구 올림픽로 300",
    route: [
      { lat: 37.5208085, lng: 127.1076804 },
      { lat: 37.5210085, lng: 127.1078804 },
      { lat: 37.5212085, lng: 127.1080804 },
      { lat: 37.5214085, lng: 127.1082804 },
    ],
    sleepEvents: 1,
    lastUpdate: "2024-03-05 14:28:00",
  },
];

// WebSocket 테스트용 졸음운전 이벤트
export const dummySleepEvent = {
  driverName: "김운전",
  time: "2024-03-05 14:35:00",
  location: "서울시 중구 세종대로 110 부근",
};

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
