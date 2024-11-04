import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "./MapContainer";
import { TMapMarker, TMapLatLng } from "@interfaces/Tmap";
import { Car } from "lucide-react"; // Lucide 아이콘 import

interface DriverMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  driverId: string;
  onClick?: () => void;
}

const DriverMarker = ({ position, driverId, onClick }: DriverMarkerProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const [marker, setMarker] = useState<TMapMarker | null>(null);

  useEffect(() => {
    if (!mapInstance) return;

    // SVG 문자열로 변환
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${Car.toString()}</svg>`;

    // SVG를 Base64로 인코딩
    const base64Svg = `data:image/svg+xml;base64,${btoa(svgString)}`;

    const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);
    const newMarker = mapInstance.addMarker({
      position: markerPosition as unknown as TMapLatLng,
      icon: base64Svg,
      url: base64Svg,
      size: new window.Tmapv2.Size(24, 24),
    });

    if (onClick) {
      mapInstance.on("Click", onClick);
    }

    setMarker(newMarker);

    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (onClick) {
        mapInstance.off("Click", onClick);
      }
    };
  }, [mapInstance, position]);

  return null;
};

export default DriverMarker;
