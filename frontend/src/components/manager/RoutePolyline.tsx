import { useEffect, useRef, useCallback } from "react";
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
 color = "#FF3B3B",
 width = 8,
}: RoutePolylineProps) => {
 const mapInstance = useAtomValue(mapInstanceAtom);
 const polylineRef = useRef<TMapPolyline | null>(null);

 const drawPolylineUsingTmap = useCallback(async () => {
   if (!mapInstance || !path.length || !window.Tmapv2) {
     console.log("맵 인스턴스나 경로가 없음");
     return;
   }

   try {
     // 기존 폴리라인 제거
     if (polylineRef.current) {
       polylineRef.current.setMap(null);
       polylineRef.current = null;
     }

     // 시작점과 끝점
     const start = path[0];
     const end = path[path.length - 1];

     // 경로 API 호출을 위한 데이터 준비
     const apiKey = import.meta.env.VITE_TMAP_API_KEY;

     // 경로 API 요청
     const response = await fetch(
       "https://apis.openapi.sk.com/tmap/routes?version=1&callback=function",
       {
         method: "POST",
         headers: {
           "Accept": "application/json",
           "Content-Type": "application/json",
           "appKey": apiKey
         },
         body: JSON.stringify({
           startName: "출발지",
           startX: start.lng.toString(),
           startY: start.lat.toString(),
           endName: "도착지",
           endX: end.lng.toString(),
           endY: end.lat.toString(),
           reqCoordType: "WGS84GEO",
           resCoordType: "WGS84GEO",
           searchOption: "0",
         })
       }
     );

     if (!response.ok) {
       throw new Error(`API 요청 실패: ${response.status}`);
     }

     const result = await response.json();
     console.log("API Response:", result);

     if (!result.features || result.features.length === 0) {
       throw new Error("경로 데이터가 없습니다.");
     }

     // API 응답에서 경로 좌표 추출
     const coordinates: TMapLatLng[] = [];
     
     for (const feature of result.features) {
       if (feature.geometry.type === "LineString") {
         feature.geometry.coordinates.forEach(([lng, lat]: [number, number]) => {
           coordinates.push(new window.Tmapv2.LatLng(lat, lng));
         });
       }
     }

     if (coordinates.length === 0) {
       throw new Error("유효한 경로 좌표가 없습니다.");
     }

     console.log("경로 좌표 생성 완료:", coordinates.length);

     // 폴리라인 생성
     const newPolyline = new window.Tmapv2.Polyline({
       path: coordinates,
       strokeColor: color,
       strokeWeight: width,
       strokeStyle: "solid",
       strokeOpacity: 0.8,
       map: mapInstance
     });

     polylineRef.current = newPolyline;
     console.log("자동차 경로 폴리라인 생성 성공");

   } catch (error) {
     console.error("폴리라인 생성 중 에러:", error);
     
     // API 실패 시 직선으로 연결
     try {
       const pathCoordinates = path.map(
         point => new window.Tmapv2.LatLng(point.lat, point.lng)
       );

       const fallbackPolyline = new window.Tmapv2.Polyline({
         path: pathCoordinates,
         strokeColor: color,
         strokeWeight: width,
         strokeStyle: "dotted", // 점선으로 변경하여 fallback임을 표시
         strokeOpacity: 0.6,    // 투명도 증가
         map: mapInstance
       });

       polylineRef.current = fallbackPolyline;
       console.log("fallback 폴리라인으로 대체 표시");
     } catch (fallbackError) {
       console.error("fallback 폴리라인 생성 중 에러:", fallbackError);
     }
   }
 }, [mapInstance, path, color, width]);

 useEffect(() => {
   drawPolylineUsingTmap();
   
   return () => {
     if (polylineRef.current) {
       try {
         polylineRef.current.setMap(null);
       } catch (e) {
         console.warn("폴리라인 cleanup 중 무시된 에러");
       }
       polylineRef.current = null;
     }
   };
 }, [drawPolylineUsingTmap]);

 return null;
};

export default RoutePolyline;