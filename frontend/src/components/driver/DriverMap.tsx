import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  mapAtom,
  routeDataAtom,
  mapInitializedAtom,
} from "@/atoms/driver/mapStore";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import { TMapMarker } from "@/interfaces/Tmap";

interface CustomTMapMarker extends TMapMarker {
  tag: number;
}

const DriverMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
  const [map, setMap] = useAtom(mapAtom);
  const [routeData, setRouteData] = useAtom(routeDataAtom);
  const [mapInitialized, setMapInitialized] = useAtom(mapInitializedAtom);

  useEffect(() => {
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

      const drawData = (data: any) => {
        const new_polyLine = [];
        const newData = [];
        let equalData = [];
        let pointId1 = "-1234567";
        let ar_line = [];

        for (let i = 0; i < data.features.length; i++) {
          const feature = data.features[i];
          if (feature.geometry.type == "LineString") {
            ar_line = [];
            for (let j = 0; j < feature.geometry.coordinates.length; j++) {
              const startPt = new window.Tmapv2.LatLng(
                feature.geometry.coordinates[j][1],
                feature.geometry.coordinates[j][0]
              );
              ar_line.push(startPt);
              pointArray.push(feature.geometry.coordinates[j]);
            }
            const polyline = new window.Tmapv2.Polyline({
              path: ar_line,
              strokeColor: "#ff0000",
              strokeWeight: 6,
              map: map,
            });
            new_polyLine.push(polyline);
          }
          const pointId2 = feature.properties.viaPointId;
          if (pointId1 != pointId2) {
            equalData = [];
            equalData.push(feature);
            newData.push(equalData);
            pointId1 = pointId2;
          } else {
            equalData.push(feature);
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

      const markerList: CustomTMapMarker[] = [];
      const pointArray = [];

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
            imgURL = destinationImg;
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
              : new window.Tmapv2.Size(24, 24),
          map: map,
        }) as CustomTMapMarker;

        marker.tag = tag;
        // marker.addListener("dragend", (evt:any) => {
        //   markerListenerEvent(evt);
        // });
        // marker.addListener("drag", (evt:any) => {
        //   markerObject = markerList[tag];
        // });
        markerList[tag] = marker;
        return marker;
      };

      addMarker("llStart", 127.02810900563199, 37.519892712436906, 1);
      addMarker("llEnd", 127.11971717230388, 37.49288934463672, 2);

      const startX = 127.02810900563199;
      const startY = 37.519892712436906;
      const endX = 127.11971717230388;
      const endY = 37.49288934463672;
      const passList = "";

      const fetchRouteData = async () => {
        try {
          const response = await axios.post(
            "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
            {
              startX,
              startY,
              endX,
              endY,
              passList,
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

          // const trafficColors = {
          //   extractStyles: true,
          //   /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
          //   trafficDefaultColor: "#636f63", //Default
          //   trafficType1Color: "#19b95f", //원할
          //   trafficType2Color: "#f15426", //지체
          //   trafficType3Color: "#ff970e", //정체
          // };
          // const styled_red = {
          //   fillColor: "#FF0000",
          //   fillOpacity: 0.2,
          //   strokeColor: "#FF0000",
          //   strokeWidth: 3,
          //   strokeDashstyle: "solid",
          //   pointRadius: 2,
          //   title: "this is a red line",
          // };
        } catch (error) {
          console.error("Error fetching route data: ", error);
        }
      };
      fetchRouteData();
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
