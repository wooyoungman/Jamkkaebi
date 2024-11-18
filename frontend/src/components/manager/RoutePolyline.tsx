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
  color = "#FF3B3B",
  width = 8,
}: RoutePolylineProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const polylineRef = useRef<TMapPolyline | null>(null);

  const drawPolyline = useCallback(() => {
    if (!mapInstance || !path.length || !window.Tmapv2) {
      console.log("맵 인스턴스나 경로가 없음");
      return;
    }

    try {
      // 기존 폴리라인 제거
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }

      // 경로 좌표 변환
      const pathCoordinates = path.map(
        point => new window.Tmapv2.LatLng(point.lat, point.lng)
      );

      // 폴리라인 생성
      const newPolyline = new window.Tmapv2.Polyline({
        path: pathCoordinates,
        strokeColor: color,
        strokeWeight: width,
        strokeStyle: "solid",
        strokeOpacity: 0.8,
        map: mapInstance
      });

      polylineRef.current = newPolyline;
      console.log("경로 폴리라인 생성 성공");

    } catch (error) {
      console.error("폴리라인 생성 중 에러:", error);
    }
  }, [mapInstance, path, color, width]);

  useEffect(() => {
    drawPolyline();
    
    return () => {
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null);
        } catch (e) {
          console.warn("폴리라인 cleanup 중 무시된 에러");
        }
        polylineRef.current = null;
      }
    };
  }, [drawPolyline]);

  return null;
};

export default RoutePolyline;