import { useEffect, useRef, useCallback } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "@atoms/index";
import { TMapMarker, TMapInstance } from "@interfaces/Tmap";
import circlechr from "@assets/circlechr.png";

interface DriverMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  driverId: number;
  onClick: () => void;
  status?: "normal" | "drowsy" | "low_focus";
}

const DriverMarker = ({ position, driverId, onClick, status = "normal" }: DriverMarkerProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const markerRef = useRef<TMapMarker | null>(null);
  const iconRef = useRef<HTMLImageElement | null>(null);

  // 아이콘 이미지 미리 로드
  useEffect(() => {
    const icon = new Image();
    icon.src = circlechr;
    icon.onload = () => {
      iconRef.current = icon;
    };
  }, []);

  const updateMarkerPosition = useCallback(() => {
    if (!mapInstance || !window.Tmapv2 || !iconRef.current) {
      console.log("맵 초기화 또는 아이콘 로드 대기 중...");
      return;
    }

    try {
      const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);

      if (!markerRef.current) {
        // 최초 마커 생성
        const newMarker = new window.Tmapv2.Marker({
          position: markerPosition,
          icon: circlechr,
          iconSize: new window.Tmapv2.Size(55, 55),
          map: mapInstance,
          title: `Driver ${driverId}`,
          offset: new window.Tmapv2.Point(27, 27),
          zIndex: 100
        });

        newMarker.addListener("click", onClick);
        markerRef.current = newMarker;
      } else {
        // 기존 마커 위치만 업데이트
        markerRef.current.setPosition(markerPosition);
      }

    } catch (error) {
      console.error("마커 업데이트 중 에러:", error);
    }
  }, [mapInstance, position.lat, position.lng, driverId, onClick]);

  useEffect(() => {
    updateMarkerPosition();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [updateMarkerPosition]);

  return null;
};

export default DriverMarker;