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
    if (!mapInstance || !path.length) {
      console.log("No map instance or empty path");
      return;
    }

    // 기존 폴리라인 제거
    if (polyline) {
      polyline.setMap(null);
    }

    const drawRoute = async () => {
      try {
        console.log("Starting route calculation");

        // API Key 확인
        const apiKey = process.env.VITE_TMAP_API_KEY;
        console.log("API Key exists:", !!apiKey);

        const passList = path.slice(1, -1).map((point, index) => ({
          viaPointId: `via${index}`,
          viaPointName: `경유지${index}`,
          viaX: point.lng.toString(),
          viaY: point.lat.toString(),
        }));

        console.log("Request data:", {
          startX: path[0].lng.toString(),
          startY: path[0].lat.toString(),
          endX: path[path.length - 1].lng.toString(),
          endY: path[path.length - 1].lat.toString(),
          passList,
        });

        // 자동차 경로로 변경 (pedestrian -> driving)
        const response = await fetch(
          "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              appKey: apiKey || "",
            },
            body: JSON.stringify({
              startX: path[0].lng.toString(),
              startY: path[0].lat.toString(),
              endX: path[path.length - 1].lng.toString(),
              endY: path[path.length - 1].lat.toString(),
              passList: passList,
              reqCoordType: "WGS84GEO",
              resCoordType: "WGS84GEO",
              startName: "출발",
              endName: "도착",
            }),
          }
        );

        const routeData = await response.json();
        console.log("Route API response:", routeData);

        // 응답 구조 변경
        let coordinates: any[] = [];

        // features 배열의 각 요소에서 coordinates 추출
        routeData.features.forEach((feature: any) => {
          if (feature.geometry.type === "LineString") {
            // LineString 타입인 경우 coordinates 배열을 바로 사용
            coordinates = coordinates.concat(
              feature.geometry.coordinates.map(
                (coord: [number, number]) =>
                  new window.Tmapv2.LatLng(coord[1], coord[0])
              )
            );
          }
        });

        console.log("Extracted coordinates:", coordinates);

        if (coordinates.length > 0) {
          const newPolyline = new window.Tmapv2.Polyline({
            path: coordinates,
            strokeColor: color,
            strokeWidth: width,
            strokeStyle: "solid",
            strokeOpacity: 0.8,
            map: mapInstance,
          });

          console.log("Created new polyline:", newPolyline);
          setPolyline(newPolyline);
        } else {
          console.error("No coordinates found in the response");
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    drawRoute();

    return () => {
      if (polyline) {
        polyline.setMap(null);
      }
    };
  }, [mapInstance, path, color, width]);

  return null;
};

export default RoutePolyline;
