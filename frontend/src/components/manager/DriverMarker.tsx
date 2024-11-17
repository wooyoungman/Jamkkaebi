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

  const createMarker = useCallback(() => {
    if (!mapInstance || !window.Tmapv2) {
      console.log("맵 초기화 대기 중...");
      return;
    }

    // 기존 마커 정리
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }

    try {
      console.log("마커 생성 시도:", {
        position,
        driverId,
        iconPath: circlechr
      });

      const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);
      
      // 아이콘 이미지를 미리 로드
      const icon = new Image();
      icon.src = circlechr;
      
      icon.onload = () => {
        const newMarker = new window.Tmapv2.Marker({
          position: markerPosition,
          icon: circlechr,
          iconSize: new window.Tmapv2.Size(55, 55),
          map: mapInstance,
          title: `Driver ${driverId}`,
          offset: new window.Tmapv2.Point(27, 27),
          zIndex: 100  // 마커가 폴리라인 위에 표시되도록
        });

        newMarker.addListener("click", onClick);
        markerRef.current = newMarker;
        
        // 명시적으로 지도에 마커 설정
        newMarker.setMap(mapInstance);

        console.log("마커 생성 및 지도 표시 완료:", {
          driverId,
          position: { lat: position.lat, lng: position.lng },
          mapInstance: !!mapInstance
        });
      };

      icon.onerror = (error) => {
        console.error("마커 이미지 로드 실패:", error);
      };

    } catch (error) {
      console.error("마커 생성 중 에러:", error);
    }
  }, [mapInstance, position.lat, position.lng, driverId, onClick]);

  useEffect(() => {
    createMarker();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
    };
  }, [createMarker]);

  return null;
};

export default DriverMarker;