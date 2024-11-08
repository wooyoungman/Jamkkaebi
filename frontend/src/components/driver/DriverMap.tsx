import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  mapAtom,
  routeDataAtom,
  mapInitializedAtom,
  // startPointAtom,
  // endPointAtom,
  // restStopsAtom,
  // polylineDataAtom,
} from "@/atoms/driver/mapStore";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import restStopImg from "@/assets/restStopImg.png";
import { TMapMarker } from "@/interfaces/Tmap";

interface CustomTMapMarker extends TMapMarker {
  tag: number;
}

const DriverMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
  const [map, setMap] = useAtom(mapAtom);
  const [routeData, setRouteData] = useAtom(routeDataAtom);
  const [mapInitialized, setMapInitialized] = useAtom(mapInitializedAtom);
  // const [startPoint, setStartPoint] = useAtom(startPointAtom);
  // const [endPoint, setEndPoint] = useAtom(endPointAtom);
  // const [restStops, setRestStops] = useAtom(restStopsAtom);
  // const [polylineData, setPolylineData] = useAtom(polylineDataAtom);

  useEffect(() => {
    const markerList: CustomTMapMarker[] = [];
    const polylineList: any[] = [];

    const initTmap = () => {
      // 1. 지도 띄우기
      const mapDiv = document.getElementById("map_div") as HTMLElement;

      const map = new window.Tmapv2.Map(mapDiv, {
        center: new window.Tmapv2.LatLng(37.52084364186228, 127.058908811749),
        width: "100%",
        height: "100%",
        zoom: 14,
        zoomControl: true,
        scrollwheel: true,
      });

      setMap(map);
      setMapInitialized(true);

      const clearMap = () => {
        // Remove all markers
        markerList.forEach((marker) => marker.setMap(null));
        markerList.length = 0; // Clear marker list

        // Remove all polylines
        polylineList.forEach((polyline) => polyline.setMap(null));
        polylineList.length = 0; // Clear polyline list
      };

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
        // let markerCnt = 1;
        // for (let i = 0; i < newData.length; i++) {
        //   const mData = newData[i];
        //   const type = mData[0].geometry.type;
        //   const pointType = mData[0].properties.pointType;
        //   if (pointType == "S") {
        //     const img = locationImg;
        //     const lon = mData[0].geometry.coordinates[0];
        //     const lat = mData[0].geometry.coordinates[1];
        //   } else if (pointType == "E") {
        //     const img = destinationImg;
        //     const lon = mData[0].geometry.coordinates[0];
        //     const lat = mData[0].geometry.coordinates[1];
        //   } else {
        //     markerCnt = i;
        //     const lon = mData[0].geometry.coordinates[0];
        //     const lat = mData[0].geometry.coordinates[1];
        //   }
        // }
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
        // marker.addListener("dragend", (evt:any) => {
        //   markerListenerEvent(evt);
        // });
        // marker.addListener("drag", (evt:any) => {
        //   markerObject = markerList[tag];
        // });

        // markerList[tag] = marker;
        markerList.push(marker);

        if (status === "llPass") {
          marker.addListener("click", () => {
            console.log(`lat: ${lat} lon: ${lon}`);

            // // 클릭된 llPass 마커 제거
            // marker.setMap(null);

            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const startLat = position.coords.latitude;
                  const startLon = position.coords.longitude;

                  clearMap();
                  addMarker("llStart", startLon, startLat, 1);
                  addMarker("llEnd", lon, lat, 2);

                  // 현재 위치를 출발지로, llPass 마커 위치를 목적지로 경로 재계산
                  fetchRouteData(startLon, startLat, lon, lat);
                },
                (error) => console.error("Geolocation error: ", error)
              );
            }
          });

          // marker.addListener("mouseenter", () => {
          //   console.log("Mouse over llPass marker");
          //   marker.setIcon(restStopImg); // 마커 아이콘 변경 (예: 강조된 버전)
          // });

          // marker.addListener("mouseleave", () => {
          //   console.log("Mouse out from llPass marker");
          //   marker.setIcon(restStopImg); // 기본 아이콘으로 변경
          // });
        }

        return marker;
      };

      const fetchRouteData = async (
        startX: number,
        startY: number,
        endX: number,
        endY: number
      ) => {
        // addMarker("llstart", startX, startY, 1);
        // addMarker("llEnd", endX, endY, 2);
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
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLat = position.coords.latitude;
            const userLon = position.coords.longitude;
            addMarker("llStart", userLon, userLat, 1);

            map.setCenter(new window.Tmapv2.LatLng(userLat, userLon));
          },
          (error) => console.error("Geolocation error: ", error)
        );
      }

      addMarker("llEnd", 127.11971717230388, 37.49288934463672, 2);
      addMarker("llPass", 127.06033711446, 37.51148310935, 3);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const startX = position.coords.longitude;
          const startY = position.coords.latitude;
          const endX = 127.11971717230388;
          const endY = 37.49288934463672;
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
        });
      }
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

export default DriverMap;
