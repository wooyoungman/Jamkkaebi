import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { mapInstanceAtom } from "@atoms/index";

const MIN_ZOOM = 9;
const MAX_ZOOM = 16;

// 위도/경도의 최대/최소값을 찾는 함수
const findBounds = (locations: Array<{ lat: number; lng: number }>) => {
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
) => {
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
const calculateOptimalZoom = (bounds: ReturnType<typeof findBounds>) => {
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

export const useMapController = (driversWithRoutes: any[]) => {
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);
  const initialSetupDone = useRef(false);

  // 초기 한 번만 실행되는 맵 설정
  useEffect(() => {
    if (mapInstance && driversWithRoutes.length > 0 && !initialSetupDone.current) {
      const allPoints = driversWithRoutes.flatMap((driver) => [
        driver.location,
        ...driver.route,
      ]);

      const bounds = findBounds(allPoints);
      const centerLat = (bounds.maxLat + bounds.minLat) / 2;
      const centerLng = (bounds.maxLng + bounds.minLng) / 2;
      const centerPoint = new window.Tmapv2.LatLng(centerLat, centerLng);

      mapInstance.setCenter(centerPoint);
      const optimalZoom = calculateOptimalZoom(bounds);
      mapInstance.setZoom(optimalZoom);

      setTimeout(() => {
        mapInstance.setZoom(optimalZoom - 0.5);
        initialSetupDone.current = true;
      }, 100);
    }
  }, [mapInstance, driversWithRoutes]);

  const handleDriverClick = (driverId: number) => {
    const driver = driversWithRoutes.find((d) => d.driverId === driverId);
    if (!driver || !mapInstance) return;

    const bounds = findBounds([driver.location, ...driver.route]);
    const centerLat = (bounds.maxLat + bounds.minLat) / 2;
    const centerLng = (bounds.maxLng + bounds.minLng) / 2;

    mapInstance.setCenter(new window.Tmapv2.LatLng(centerLat, centerLng));
    const newZoom = calculateOptimalZoom(bounds);
    mapInstance.setZoom(newZoom + 1);
  };

  return {
    mapInstance,
    handleDriverClick,
  };
};