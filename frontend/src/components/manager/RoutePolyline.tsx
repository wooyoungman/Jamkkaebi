import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "./MapContainer";
import { TMapPolyline, TMapLatLng } from "@interfaces/Tmap";

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
  color = "#FF0000",
  width = 3,
}: RoutePolylineProps) => {
  const mapInstance = useAtomValue(mapInstanceAtom);
  const [polyline, setPolyline] = useState<TMapPolyline | null>(null);

  useEffect(() => {
    if (!mapInstance || !path.length) return;

    const positions = path.map(
      (pos) => new window.Tmapv2.LatLng(pos.lat, pos.lng)
    );

    const newPolyline = mapInstance.addPolyline({
      path: positions as unknown as TMapLatLng[],
      style: {
        strokeColor: color,
        strokeWidth: width,
        strokeOpacity: 0.8,
      },
    });

    setPolyline(newPolyline);

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [mapInstance, path, color, width]);

  return null;
};

export default RoutePolyline;
