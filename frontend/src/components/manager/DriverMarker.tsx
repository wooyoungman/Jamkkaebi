import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "@atoms/index";
import { TMapMarker, TMapInstance, TMapLatLng } from "@interfaces/Tmap";
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

  useEffect(() => {
    if (!mapInstance) return;

    // 기존 마커 제거
    if (markerRef.current) {
      markerRef.current.setMap(null);
    }

    const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);
    
    // 마커 생성
    const newMarker = new window.Tmapv2.Marker({
      position: markerPosition,
      icon: circlechr,
      iconSize: new window.Tmapv2.Size(55, 55),
      map: mapInstance as TMapInstance,
      title: `Driver ${driverId}`,
    });

    // 이벤트 리스너 추가
    newMarker.addListener("click", onClick);
    markerRef.current = newMarker;

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [mapInstance, position.lat, position.lng, driverId, onClick]);

  return null;
};

export default DriverMarker;