import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { atom, useAtom } from "jotai";

import { TMap, TMapLatLng, MapOptions } from "@interfaces/Tmap";

// 지도 인스턴스를 전역으로 관리
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
  initialCenter = { lat: 37.5666805, lng: 126.9784147 }, // 서울 시청
  initialZoom = 16,
  children,
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);

  useEffect(() => {
    // Tmapv2 객체가 로드될 때까지 기다리는 함수
    const waitForTmap = () => {
      if (window.Tmapv2) {
        initializeMap();
      } else {
        setTimeout(waitForTmap, 100);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || mapInstance) return;

      try {
        console.log("Initializing map...", window.Tmapv2);

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
        console.log("Map created:", map);
        setMapInstance(map as unknown as TMap);
      } catch (error) {
        console.error("Map initialization error:", error);
      }
    };

    waitForTmap();

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
        setMapInstance(null);
      }
    };
  }, [mapInstance, initialCenter, initialZoom]); // dependency array 수정

  return (
    <MapContainer.Root ref={mapRef} width={width} height={height}>
      {children}
    </MapContainer.Root>
  );
};

// 스타일 컴포넌트
MapContainer.Root = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: relative;
  z-index: 1;
`;

export default MapContainer;
