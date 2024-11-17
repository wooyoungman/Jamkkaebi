import { useEffect, useState, useRef } from "react";
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
  const [polyline, setPolyline] = useState<TMapPolyline | null>(null);
  const polylineRef = useRef<TMapPolyline | null>(null);

  useEffect(() => {
    if (!mapInstance || !path.length) {
      console.log("No map instance or empty path");
      return;
    }

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      try {
        polylineRef.current.setMap(null);
      } catch (e) {
        console.warn("폴리라인 제거 중 에러:", e);
      }
    }

    const coordinates: TMapLatLng[] = path.map(
      (point) => new window.Tmapv2.LatLng(point.lat, point.lng)
    );

    try {
      const newPolyline = new window.Tmapv2.Polyline({
        path: coordinates,
        strokeColor: color,
        strokeWeight: width,
        strokeStyle: "solid",
        strokeOpacity: 0.8,
        map: mapInstance as TMapInstance,
      });

      setPolyline(newPolyline);
      polylineRef.current = newPolyline;

    } catch (error) {
      console.error("Error creating polyline:", error);
    }

    return () => {
      if (polylineRef.current) {
        try {
          polylineRef.current.setMap(null);
        } catch (e) {
          // 이미 맵이 제거된 경우 무시
        }
      }
    };
  }, [mapInstance, path, color, width]);

  return null;
};

export default RoutePolyline;