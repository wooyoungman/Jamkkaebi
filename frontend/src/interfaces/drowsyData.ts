import { DrowsyEvent } from "./manager";

export const dummyDrowsyEvents: DrowsyEvent[] = [
  {
    id: 1,
    username: "driver3",
    driverName: "송준혁",
    age: 24,
    gender: "남",
    profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=123",
    timestamp: "2024-10-20 03:48",
    location: {
      lat: 33.4834,
      lng: 126.4893,
    },
    route: [
      // 제주 신제주로터리 부근 (약 150m 구간)
      { lat: 33.4835, lng: 126.489 }, // 시작
      { lat: 33.4834, lng: 126.4893 }, // 졸음 발생 지점
      { lat: 33.4833, lng: 126.4896 }, // 끝
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
    profileImage: "https://robohash.org/123?set=set4",
    timestamp: "2024-10-18 13:12",
    location: {
      lat: 37.498622,
      lng: 127.026375,
    },
    route: [
      // 강남대로 구간 (약 150m 구간)
      { lat: 37.498822, lng: 127.026175 }, // 시작
      { lat: 37.498622, lng: 127.026375 }, // 졸음 발생 지점
      { lat: 37.498422, lng: 127.026575 }, // 끝
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
    profileImage: "https://picsum.photos/200",
    timestamp: "2024-10-12 15:02",
    location: {
      lat: 37.557427,
      lng: 126.92527,
    },
    route: [
      // 홍대 근처 (약 100m 구간)
      { lat: 37.557527, lng: 126.92507 }, // 시작
      { lat: 37.557427, lng: 126.92527 }, // 졸음 발생 지점
      { lat: 37.557327, lng: 126.92547 }, // 끝
    ],
    drowsyCount: 4,
    drowsyTime: 12,
    fatigueLevel: "강함",
  },
];
