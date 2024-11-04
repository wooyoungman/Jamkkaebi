import { DrowsyEvent } from "./manager";

export const dummyDrowsyEvents: DrowsyEvent[] = [
    {
      id: '1',
      driverName: '송준혁',
      age: 24,
      gender: '남',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SongJunHyeok&backgroundColor=b6e3f4',
      timestamp: '2024-10-20 03:48',
      location: {
        lat: 30.0444,  // 카이로 주변 좌표
        lng: 31.2357
      },
      drowsyCount: 3,
      drowsyTime: 8,
      fatigueLevel: '강함'
    },
    {
      id: '2',
      driverName: '조정훈',
      age: 22,
      gender: '남',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JoJungHun&backgroundColor=c0aede',
      timestamp: '2024-10-18 13:12',
      location: {
        lat: 30.0459,
        lng: 31.2365
      },
      drowsyCount: 2,
      drowsyTime: 5,
      fatigueLevel: '보통'
    },
    {
      id: '3',
      driverName: '송준혁',
      age: 24,
      gender: '남',
      profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SongJunHyeok&backgroundColor=b6e3f4',
      timestamp: '2024-10-12 15:02',
      location: {
        lat: 30.0471,
        lng: 31.2372
      },
      drowsyCount: 4,
      drowsyTime: 12,
      fatigueLevel: '강함'
    }
  ];