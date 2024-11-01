import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { atom, useAtom } from "jotai";

import { TMap, TMapLatLng, MapOptions } from "@interfaces/Tmap";

// 지도 인스턴스를 전역으로 관리하기 위한 atom
export const mapInstanceAtom = atom<TMap | null>(null);

interface MapContainerProps {
  width?: string;
  height?: string;
  initialCenter?: {
    lat: number;
    lng: number;
  };
  initialZoom?: number;
}

const MapContainer = ({
  width = "100%",
  height = "100%",
  initialCenter = { lat: 37.5666805, lng: 126.9784147 }, // 서울 시청
  initialZoom = 16,
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useAtom(mapInstanceAtom);

  // 지도 초기화
  useEffect(() => {
    if (!mapRef.current || mapInstance) return;

    // TMap 인스턴스 생성
    const options: MapOptions = {
      center: new window.Tmapv2.LatLng(initialCenter.lat, initialCenter.lng),
      width: "100%",
      height: "100%",
      zoom: initialZoom,
    };

    const map = new window.Tmapv2.Map(mapRef.current, options);
    setMapInstance(map as unknown as TMap);

    return () => {
      if (mapInstance) {
        mapInstance.destroy();
        setMapInstance(null);
      }
    };
  }, []);

  return <MapContainer.Root ref={mapRef} width={width} height={height} />;
};

// 스타일 컴포넌트
MapContainer.Root = styled.div<{ width: string; height: string }>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

export default MapContainer;
