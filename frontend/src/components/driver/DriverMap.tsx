import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import {
  mapAtom,
  routeDataAtom,
  startPointAtom,
  endPointAtom,
  restStopsAtom,
} from "@/atoms/driver/mapStore";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import restStopImg from "@/assets/restStopImg.png";
import { TMapMarker } from "@/interfaces/Tmap";
import { serverDriverStateDataAtom } from "@/atoms/driver/socket";
import { tokenAtom } from "@/atoms/driver/carInfo";

interface CustomTMapMarker extends TMapMarker {
  tag: number;
}

const DriverMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
  const [tmapValue, setTMapValue] = useAtom(mapAtom);
  const [routeData, setRouteData] = useAtom(routeDataAtom);
  const [startPoint, setStartPoint] = useAtom(startPointAtom);
  const [endPoint, setEndPoint] = useAtom(endPointAtom);
  const [restStops, setRestStops] = useAtom(restStopsAtom);
  const [serverDriverStateData] = useAtom(serverDriverStateDataAtom);
  const [token] = useAtom(tokenAtom);

  // "llStart" 마커 상태를 단일 마커로 관리
  const [llStartMarker, setLlStartMarker] = useState<any | null>(null);

  const polylineList: any[] = [];

  const initTmap = () => {
    const mapDiv = document.getElementById("map_div") as HTMLElement;

    const centerPoint = startPoint
      ? new window.Tmapv2.LatLng(startPoint.lat, startPoint.lon)
      : new window.Tmapv2.LatLng(34.75746280159556, 126.35492245670288); // 기본 좌표

    const map = new window.Tmapv2.Map(mapDiv, {
      center: centerPoint,
      width: "100%",
      height: "100%",
      zoom: 14,
      zoomControl: true,
      scrollwheel: true,
    });

    setTMapValue(map);

    if (startPoint) {
      setLlStartMarker(
        addMarker(map, "llStart", startPoint.lon, startPoint.lat, 1)
      );
      map.setCenter(new window.Tmapv2.LatLng(startPoint.lat, startPoint.lon));
    }

    if (endPoint) {
      addMarker(map, "llEnd", endPoint.lon, endPoint.lat, 2);
    }
  };

  const addMarker = (
    map: any,
    status: string,
    lon: number,
    lat: number,
    tag: number
  ) => {
    let imgURL: string | undefined;
    switch (status) {
      case "llStart":
        imgURL = locationImg;
        break;
      case "llPass":
        imgURL = restStopImg;
        break;
      case "llEnd":
        imgURL = destinationImg;
        break;
      default:
        imgURL = undefined;
    }

    const marker = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(lat, lon),
      icon: imgURL,
      iconSize:
        imgURL === locationImg
          ? new window.Tmapv2.Size(15, 15)
          : new window.Tmapv2.Size(30, 30),
      map: map,
    }) as CustomTMapMarker;

    marker.tag = tag;

    if (status === "llPass") {
      setRestStops((prev) => [...prev, { lat, lon, tag }]);
    }

    return marker;
  };

  const drawData = (data: any, map: any) => {
    for (const feature of data.features) {
      if (feature.geometry.type === "LineString") {
        const ar_line = feature.geometry.coordinates.map(
          (coord: [number, number]) =>
            new window.Tmapv2.LatLng(coord[1], coord[0])
        );
        const polyline = new window.Tmapv2.Polyline({
          path: ar_line,
          strokeColor: "#00ff00",
          strokeWeight: 6,
          map: map,
        });
        polylineList.push(polyline);
      }
    }
  };

  const clearMarker = () => {
    if (llStartMarker) {
      llStartMarker.setMap(null); // 지도에서 기존 마커 제거
      setLlStartMarker(null); // 상태 초기화
      // console.log("Start marker cleared");
    }
  };

  const fetchRouteData = async () => {
    try {
      const response = await axios.get(
        "https://k11c106.p.ssafy.io/api/v1/driver/delivery/current",
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰 추가
          },
        }
      );
      const routeData = response.data.data.route_info;
      setRouteData(routeData);
      if (tmapValue) {
        drawData(routeData, tmapValue);
      }
    } catch (error) {
      console.error("Error fetching route data:", error);
    }
  };

  useEffect(() => {
    if (serverDriverStateData?.coordinate) {
      const [lon, lat] = serverDriverStateData.coordinate;
      setStartPoint({ lat, lon });

      if (tmapValue) {
        tmapValue.setCenter(new window.Tmapv2.LatLng(lat, lon));

        // 기존 마커 제거 후 새 마커 추가
        clearMarker();
        setLlStartMarker(addMarker(tmapValue, "llStart", lon, lat, 1));
        // console.log("New start marker added at:", { lat, lon });
      }
    }
  }, [serverDriverStateData, tmapValue]);

  useEffect(() => {
    initTmap();
  }, []);

  useEffect(() => {
    if (tmapValue) {
      fetchRouteData(); // 지도 초기화 이후 경로 데이터 로드
    }
  }, [tmapValue]);

  return <div id="map_div" style={{ width: "100%", height: "100%" }}></div>;
};

export default DriverMap;
