import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  mapAtom,
  routeDataAtom,
  mapInitializedAtom,
  startPointAtom,
  endPointAtom,
  restStopsAtom,
} from "@/atoms/driver/mapStore";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import restStopImg from "@/assets/restStopImg.png";
import { TMapMarker } from "@/interfaces/Tmap";

interface CustomTMapMarker extends TMapMarker {
  tag: number;
}

const DriverReportMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
  const [map, setMap] = useAtom(mapAtom);
  const [routeData, setRouteData] = useAtom(routeDataAtom);
  // const [mapInitialized, setMapInitialized] = useAtom(mapInitializedAtom);
  const [startPoint, setStartPoint] = useAtom(startPointAtom);
  const [endPoint, setEndPoint] = useAtom(endPointAtom);
  const [restStops, setRestStops] = useAtom(restStopsAtom);

  useEffect(() => {
    // 지도 초기화(마커와 경로 지움)
    const clearMap = () => {
      // Remove all markers
      markerList.forEach((marker) => marker.setMap(null));
      markerList.length = 0; // Clear marker list

      // Remove all polylines
      polylineList.forEach((polyline) => polyline.setMap(null));
      polylineList.length = 0; // Clear polyline list
      console.log("Map cleared");
    };

    const markerList: CustomTMapMarker[] = [];
    const polylineList: any[] = [];

    const initTmap = () => {
      // 1. 지도 띄우기
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

      setMap(map);
      // setMapInitialized(true);

      const drawData = (data: any) => {
        // clearMap();

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
        // console.log("Route drawn on map");
      };

      const addMarker = (
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
        // console.log(
        //   `Adding marker - Status: ${status}, Lat: ${lat}, Lon: ${lon}`
        // );

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
        markerList.push(marker);

        if (status === "llPass") {
          setRestStops((prev) => [...prev, { lat, lon, tag }]);

          marker.addListener("click", () => {
            // console.log(`Clicked on llPass marker at Lat: ${lat}, Lon: ${lon}`);

            setRestStops((prev) =>
              prev.filter((stop) => stop.lat !== lat && stop.lon !== lon)
            );

            const startLat = startPoint?.lat;
            const startLon = startPoint?.lon;

            clearMap();
            addMarker("llStart", startLon!, startLat!, 1);
            addMarker("llEnd", lon, lat, 2);

            fetchRouteData(startLon!, startLat!, lon, lat);
          });
        }

        return marker;
      };

      const fetchRouteData = async (
        startX: number,
        startY: number,
        endX: number,
        endY: number
      ) => {
        try {
          const response = await axios.post(
            "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
            {
              startX,
              startY,
              endX,
              endY,
              passList: "",
              reqCoordType: "WGS84GEO",
              resCoordType: "WGS84GEO",
              angle: "172",
              searchOption: "0",
              trafficInfo: "Y",
            },
            {
              headers: {
                appKey: API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          setRouteData(response.data);
          drawData(response.data);
          setStartPoint({ lat: startY, lon: startX });
          setEndPoint({ lat: endY, lon: endX });
          // console.log("Fetched and Renewaled Data");
        } catch (error) {
          console.error("Error fetching route data:", error);
        }
      };

      // 시작점 표시
      if (startPoint) {
        // console.log("Start point exists");
        addMarker("llStart", startPoint.lon, startPoint.lat, 1);
        map.setCenter(new window.Tmapv2.LatLng(startPoint.lat, startPoint.lon));
      }

      // 도착지 표시
      if (endPoint) {
        // console.log("End point exists");
        addMarker("llEnd", endPoint.lon, endPoint.lat, 2);
      } else {
        // console.log("End point didn't exists");
        addMarker("llEnd", 126.81110170278345, 35.2054670279613, 2);
        setEndPoint({ lat: 35.2054670279613, lon: 126.81110170278345 });
      }
      restStops.forEach((stop) => {
        addMarker("llPass", stop.lon, stop.lat, stop.tag);
        console.log("Added rest stop marker at:", stop.lat, stop.lon);
      });

      const fetchAndDrawRoute = async () => {
        if (startPoint) {
          const startX = startPoint.lon; // startPoint.lon 사용
          const startY = startPoint.lat; // startPoint.lat 사용
          const endX = 126.81110170278345;
          const endY = 35.2054670279613;

          if (routeData) {
            drawData(routeData);
          } else {
            try {
              const response = await axios.post(
                "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
                {
                  startX,
                  startY,
                  endX,
                  endY,
                  passList: "",
                  reqCoordType: "WGS84GEO",
                  resCoordType: "WGS84GEO",
                  angle: "172",
                  searchOption: "0",
                  trafficInfo: "Y",
                },
                {
                  headers: {
                    appKey: API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                }
              );
              setRouteData(response.data);
              drawData(response.data);
            } catch (error) {
              console.error("Error fetching route data:", error);
            }
          }
        } else {
          console.error("StartPoint is not defined");
        }
      };

      // 비동기 함수 호출
      fetchAndDrawRoute();
    };

    if (!window.Tmapv2) {
      const script = document.createElement("script");
      script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${API_KEY}`;
      script.async = true;
      script.onload = initTmap;
      document.head.appendChild(script);
    } else {
      initTmap();
    }
  }, []);
  return <div id="map_div" style={{ width: "100%", height: "100%" }}></div>;
};

export default DriverReportMap;
