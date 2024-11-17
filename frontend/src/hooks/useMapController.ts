import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { mapInstanceAtom } from "@atoms/index";
import { TMapInstance, TMapLatLng } from "@interfaces/Tmap";
import { RealTimeDriver } from "@interfaces/manager";

const MIN_ZOOM = 9;
const MAX_ZOOM = 16;

// 위도/경도의 최대/최소값을 찾는 함수
const findBounds = (locations: Array<{ lat: number; lng: number }>) => {
 if (!locations.length) return null;
 
 let minLat = locations[0].lat;
 let maxLat = locations[0].lat;
 let minLng = locations[0].lng;
 let maxLng = locations[0].lng;

 locations.forEach((loc) => {
   minLat = Math.min(minLat, loc.lat);
   maxLat = Math.max(maxLat, loc.lat);
   minLng = Math.min(minLng, loc.lng);
   maxLng = Math.max(maxLng, loc.lng);
 });

 return { minLat, maxLat, minLng, maxLng };
};

// 두 지점 간의 거리를 계산하는 함수 (km 단위)
const calculateDistance = (
 lat1: number,
 lng1: number,
 lat2: number,
 lng2: number
): number => {
 const R = 6371; // 지구의 반경 (km)
 const dLat = ((lat2 - lat1) * Math.PI) / 180;
 const dLon = ((lng2 - lng1) * Math.PI) / 180;
 const a =
   Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   Math.cos((lat1 * Math.PI) / 180) *
     Math.cos((lat2 * Math.PI) / 180) *
     Math.sin(dLon / 2) *
     Math.sin(dLon / 2);
 const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 return R * c;
};

// 모든 경로의 범위에 따라 적절한 줌 레벨을 계산하는 함수
const calculateOptimalZoom = (bounds: NonNullable<ReturnType<typeof findBounds>>): number => {
 const distance = calculateDistance(
   bounds.minLat,
   bounds.minLng,
   bounds.maxLat,
   bounds.maxLng
 );

 if (distance < 2) return MAX_ZOOM;
 if (distance < 5) return 15;
 if (distance < 10) return 14;
 if (distance < 20) return 13;
 if (distance < 40) return 12;
 if (distance < 80) return 11;
 if (distance < 160) return 10;
 return MIN_ZOOM;
};

export const useMapController = (driversWithRoutes: RealTimeDriver[]) => {
 const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);
 const initialSetupDone = useRef(false);

 // 초기 한 번만 실행되는 맵 설정 
 useEffect(() => {
   if (!mapInstance || !driversWithRoutes.length || !window.Tmapv2) {
     console.log("맵 초기화 대기 중...");
     return;
   }

   if (!initialSetupDone.current) {
     try {
       console.log("맵 초기 설정 시작");
       const allPoints = driversWithRoutes.flatMap((driver) => [
         driver.location,
         ...driver.route,
       ]);

       const bounds = findBounds(allPoints);
       if (!bounds) {
         console.log("유효한 좌표가 없습니다");
         return;
       }

       const centerLat = (bounds.maxLat + bounds.minLat) / 2;
       const centerLng = (bounds.maxLng + bounds.minLng) / 2;
       const centerPoint = new window.Tmapv2.LatLng(centerLat, centerLng);

       // 지연 설정으로 변경
       setTimeout(() => {
         if (mapInstance) {
           mapInstance.setCenter(centerPoint);
           const optimalZoom = calculateOptimalZoom(bounds);
           mapInstance.setZoom(optimalZoom);
           console.log("맵 초기 설정 완료:", { centerLat, centerLng, optimalZoom });
           initialSetupDone.current = true;
         }
       }, 500);

     } catch (error) {
       console.error("맵 초기 설정 중 에러:", error);
     }
   }
 }, [mapInstance, driversWithRoutes]);

 const handleDriverClick = (driverId: number) => {
   if (!mapInstance || !window.Tmapv2) {
     console.warn("맵 인스턴스가 없습니다");
     return;
   }

   const driver = driversWithRoutes.find((d) => d.driverId === driverId);
   if (!driver) {
     console.warn("드라이버를 찾을 수 없습니다:", driverId);
     return;
   }

   try {
     const bounds = findBounds([driver.location, ...driver.route]);
     if (!bounds) return;

     const centerLat = (bounds.maxLat + bounds.minLat) / 2;
     const centerLng = (bounds.maxLng + bounds.minLng) / 2;
     const centerPoint = new window.Tmapv2.LatLng(centerLat, centerLng);

     mapInstance.setCenter(centerPoint);
     const newZoom = calculateOptimalZoom(bounds);
     mapInstance.setZoom(newZoom + 1);
     
     console.log("드라이버 위치로 이동:", { driverId, centerLat, centerLng, zoom: newZoom + 1 });
   } catch (error) {
     console.error("드라이버 위치 이동 중 에러:", error);
   }
 };

 return {
   mapInstance,
   handleDriverClick,
 };
};