import { useEffect, useRef } from "react";
import styled from "styled-components";
import { atom, useAtom } from "jotai";

import { TMap, TMapLatLng, MapOptions } from "@interfaces/Tmap";

export const mapInstanceAtom = atom<TMap | null>(null);

interface MapContainerProps {
  width?: string;
  height?: string;
  initialCenter?: {
    lat: number;
    lng: number;
  };
  initialZoom?: number;
  children?: React.ReactNode;
}

const MapContainer = ({
  width = "100%",
  height = "100%",
  initialCenter = { lat: 37.5666805, lng: 126.9784147 },
  initialZoom = 16,
  children,
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);
  const mapInstanceRef = useRef<TMap | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const waitForTmap = () => {
      if (window.Tmapv2) {
        initializeMap();
      } else {
        timeoutId = setTimeout(waitForTmap, 100);
      }
    };

    const initializeMap = () => {
      // 이미 지도가 초기화되어 있다면 재사용
      if (mapInstanceRef.current) {
        const position = new window.Tmapv2.LatLng(
          initialCenter.lat,
          initialCenter.lng
        );
        mapInstanceRef.current.setCenter(position);
        mapInstanceRef.current.setZoom(initialZoom);
        return;
      }

      if (!mapRef.current) return;

      try {
        console.log("Initializing map with center:", initialCenter);

        const options: MapOptions = {
          center: new window.Tmapv2.LatLng(
            initialCenter.lat,
            initialCenter.lng
          ),
          width: "100%",
          height: "100%",
          zoom: initialZoom,
        };

        const map = new window.Tmapv2.Map(mapRef.current, options);

        // 지도 인스턴스 저장
        mapInstanceRef.current = map as unknown as TMap;
        setMapInstance(map as unknown as TMap);

        console.log("Map initialized successfully");
      } catch (error) {
        console.error("Map initialization error:", error);
      }
    };

    waitForTmap();

    // Cleanup
    return () => {
      // 타임아웃 클리어
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (mapInstanceRef.current) {
        try {
          // 모든 오버레이 제거
          if (typeof mapInstanceRef.current.removeAllOverlays === "function") {
            mapInstanceRef.current.removeAllOverlays();
          }

          // 모든 마커 제거
          if (typeof mapInstanceRef.current.destroy === "function") {
            mapInstanceRef.current.destroy();
          }
        } catch (error) {
          console.error("Map cleanup error:", error);
        }

        // 상태 초기화
        mapInstanceRef.current = null;
        setMapInstance(null);
      }
    };
  }, [initialCenter.lat, initialCenter.lng, initialZoom, setMapInstance]);

  // center나 zoom이 변경될 때 지도 업데이트
  useEffect(() => {
    if (mapInstanceRef.current && window.Tmapv2) {
      const position = new window.Tmapv2.LatLng(
        initialCenter.lat,
        initialCenter.lng
      );
      mapInstanceRef.current.setCenter(position);
      mapInstanceRef.current.setZoom(initialZoom);
    }
  }, [initialCenter.lat, initialCenter.lng, initialZoom]);

  return (
    <MapContainer.Root ref={mapRef} width={width} height={height}>
      {children}
    </MapContainer.Root>
  );
};

MapContainer.Root = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
  z-index: 1;
  display: block;
  min-height: 400px;
`;

export default MapContainer;
