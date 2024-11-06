import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { mapInstanceAtom } from "./MapContainer";
import { TMapPolyline } from "@interfaces/Tmap";

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
  width = 50,
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
      try {
        polyline.setMap(null);
      } catch (e) {
        console.warn("폴리라인 제거 중 에러:", e);
      }
    }

    const drawRoute = async () => {
      try {
        console.log("경로 계산 시작");

        const apiKey = import.meta.env.VITE_TMAP_API_KEY;

        const requestData = {
          appKey: apiKey,
          startX: path[0].lng.toString(),
          startY: path[0].lat.toString(),
          endX: path[path.length - 1].lng.toString(),
          endY: path[path.length - 1].lat.toString(),
          reqCoordType: "WGS84GEO",
          resCoordType: "WGS84GEO",
          angle: "172",
          searchOption: "0",
          trafficInfo: "Y",
        };

        const response = await fetch(
          "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              appKey: apiKey,
            },
            body: JSON.stringify(requestData),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        if (responseData && responseData.features) {
          let coordinates: any[] = [];

          responseData.features.forEach((feature: any) => {
            if (feature.geometry.type === "LineString") {
              coordinates = coordinates.concat(
                feature.geometry.coordinates.map(
                  (coord: [number, number]) =>
                    new window.Tmapv2.LatLng(coord[1], coord[0])
                )
              );
            }
          });

          if (coordinates.length > 0) {
            const newPolyline = new window.Tmapv2.Polyline({
              path: coordinates,
              strokeColor: color,
              strokeWidth: width,
              strokeStyle: "solid",
              strokeOpacity: 0.8,
              map: mapInstance,
            });

            setPolyline(newPolyline);
          }
        }
      } catch (error) {
        console.error("Error fetching route:", error);
        // API 호출 실패 시 직선으로 연결
        const fallbackPath = path.map(
          (point) => new window.Tmapv2.LatLng(point.lat, point.lng)
        );

        const fallbackPolyline = new window.Tmapv2.Polyline({
          path: fallbackPath,
          strokeColor: color,
          strokeWidth: width,
          strokeStyle: "solid",
          strokeOpacity: 0.8,
          map: mapInstance,
        });

        setPolyline(fallbackPolyline);
      }
    };

    drawRoute();

    return () => {
      if (polyline) {
        try {
          polyline.setMap(null);
        } catch (e) {
          console.warn("Cleanup - 폴리라인 제거 중 에러:", e);
        }
      }
    };
  }, [mapInstance, path, color, width]);

  return null;
};

export default RoutePolyline;
