import { DrowsyEvent } from "./manager";

export const dummyDrowsyEvents: DrowsyEvent[] = [
  {
    id: 1,
    username: "driver3",
    driverName: "송준혁",
    age: 24,
    gender: "남",
    profileImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=SongJunHyeok&backgroundColor=b6e3f4",
    timestamp: "2024-10-20 03:48",
    location: {
      lat: 37.551111,
      lng: 126.988333,
    },
    route: [
      { lat: 37.5514, lng: 126.9622 }, // 졸음 발생 직전 위치
      { lat: 37.551111, lng: 126.988333 }, // 졸음운전 발생 지점
      { lat: 37.5422, lng: 126.9517 }, // 졸음 발생 직후 위치
    ],
    drowsyCount: 3,
    drowsyTime: 8,
    fatigueLevel: "강함",
  },
  {
    id: 2,
    username: "driver4",
    driverName: "조정훈",
    age: 22,
    gender: "남",
    profileImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=JoJungHun&backgroundColor=c0aede",
    timestamp: "2024-10-18 13:12",
    location: {
      lat: 35.158333,
      lng: 129.160556,
    },
    route: [
      { lat: 35.1468, lng: 129.0592 }, // 졸음 발생 직전 위치
      { lat: 35.158333, lng: 129.160556 }, // 졸음운전 발생 지점
      { lat: 35.1557, lng: 129.1562 }, // 졸음 발생 직후 위치
    ],
    drowsyCount: 2,
    drowsyTime: 5,
    fatigueLevel: "보통",
  },
  {
    id: 3,
    username: "driver3",
    driverName: "송준혁",
    age: 24,
    gender: "남",
    profileImage:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=SongJunHyeok&backgroundColor=b6e3f4",
    timestamp: "2024-10-12 15:02",
    location: {
      lat: 33.458333,
      lng: 126.942778,
    },
    route: [
      { lat: 33.489, lng: 126.5338 }, // 졸음 발생 직전 위치
      { lat: 33.458333, lng: 126.942778 }, // 졸음운전 발생 지점
      { lat: 33.4634, lng: 126.9401 }, // 졸음 발생 직후 위치
    ],
    drowsyCount: 4,
    drowsyTime: 12,
    fatigueLevel: "강함",
  },
];
