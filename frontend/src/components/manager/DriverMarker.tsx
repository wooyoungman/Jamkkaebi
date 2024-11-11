import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "./MapContainer";
import { TMapMarker, TMapLatLng, TMapSize } from "@interfaces/Tmap";
import circlechr from "@assets/circlechr.png";

interface DriverMarkerProps {
  position: {
    lat: number;
    lng: number;
  };
  driverId: number;
  onClick?: () => void;
}

const DriverMarker = ({ position, driverId, onClick }: DriverMarkerProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const [marker, setMarker] = useState<TMapMarker | null>(null);

  useEffect(() => {
    if (!mapInstance) return;

    const markerPosition = new window.Tmapv2.LatLng(position.lat, position.lng);
    const newMarker = new window.Tmapv2.Marker({
      position: markerPosition,
      icon: circlechr,
      iconSize: new window.Tmapv2.Size(40, 40),
      map: mapInstance,
      title: `Driver ${driverId}`,
    });

    if (onClick) {
      newMarker.addListener("click", onClick);
    }

    setMarker(newMarker);

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [mapInstance, position, driverId]);

  return null;
};

export default DriverMarker;
