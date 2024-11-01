import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "./MapContainer";
import { TMapMarker, TMapLatLng } from "@interfaces/Tmap";

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

    const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);
    const newMarker = mapInstance.addMarker({
      position: markerPosition as unknown as TMapLatLng,
      icon: "/driver-marker.svg", // 마커 아이콘 경로
      url: "/driver-marker.svg",
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
