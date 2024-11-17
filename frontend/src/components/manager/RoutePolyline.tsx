import { useEffect, useRef, useCallback } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "@atoms/index";
import { TMapPolyline, TMapLatLng, TMapInstance } from "@interfaces/Tmap";

interface RoutePolylineProps {
  path: Array<{
    lat: number;
    lng: number;
  }>;
  color?: string;
  width?: number;
}

const RoutePolyline = ({
  path,
  color = "#9361ff",
  width = 50,
}: RoutePolylineProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const polylineRef = useRef<TMapPolyline | null>(null);

  const createPolyline = useCallback(() => {
    if (!mapInstance || !path.length || !window.Tmapv2) {
      console.log("맵 인스턴스나 경로가 없음:", {
        hasMap: !!mapInstance,
        pathLength: path.length
      });
      return;
    }

    try {
      // 기존 폴리라인 제거 (에러 발생하지 않도록 수정)
      if (polylineRef.current) {
        polylineRef.current.setPath([]);  // 경로 초기화
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }

      const coordinates = path.map(
        point => new window.Tmapv2.LatLng(point.lat, point.lng)
      );

      console.log("폴리라인 생성 시도:", {
        coordinates,
        color,
        width
      });

      const newPolyline = new window.Tmapv2.Polyline({
        path: coordinates,
        strokeColor: color,
        strokeWeight: width,
        strokeStyle: "solid",
        strokeOpacity: 0.8,
        map: mapInstance
      });

      polylineRef.current = newPolyline;
      console.log("폴리라인 생성 성공");
      
    } catch (error) {
      console.error("폴리라인 생성 중 에러:", error);
    }
  }, [mapInstance, path, color, width]);

  useEffect(() => {
    createPolyline();
    
    return () => {
      if (polylineRef.current) {
        try {
          polylineRef.current.setPath([]);  // 경로 초기화
          polylineRef.current.setMap(null);
        } catch (e) {
          console.warn("폴리라인 cleanup 중 무시된 에러");
        }
        polylineRef.current = null;
      }
    };
  }, [createPolyline]);

  return null;
};

export default RoutePolyline;