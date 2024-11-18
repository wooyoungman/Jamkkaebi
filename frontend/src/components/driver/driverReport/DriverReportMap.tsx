import { useEffect } from "react";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import {
  TMapInstance,
  MapOptions,
  TMapLatLng,
  TMapMarker,
  PolylineOptions,
  TMapPolyline,
} from "@/interfaces/Tmap"; // 타입 가져오기

const DriverReportMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;

  useEffect(() => {
    const initTmap = () => {
      const mapOptions: MapOptions = {
        center: new window.Tmapv2.LatLng(37.52084364186228, 127.058908811749),
        width: "100%",
        height: "100%",
        zoom: 14,
        zoomControl: true,
        scrollwheel: true,
      };
      const map: TMapInstance = new window.Tmapv2.Map(
        document.getElementById("map_div") as HTMLElement,
        mapOptions
      );

      const new_polyLine: TMapPolyline[] = [];
      const new_Click_polyLine: TMapPolyline[] = [];

      // 지워야 할것
      let routeData: any;
      // let geoData: any[];
      const markerList: TMapMarker[] = [];
      const pointArray: TMapLatLng[] = [];

      const drawData = (data: any) => {
        routeData = data;
        const resultStr = "";
        const distance = 0;
        const idx = 1;

        const newData: any[] = [];
        let equalData: any[] = [];
        let pointId1 = "-1234567";
        let ar_line: TMapLatLng[] = [];

        for (let i = 0; i < data.features.length; i++) {
          const feature = data.features[i];
          if (feature.geometry.type == "LineString") {
            ar_line = [];
            for (let j = 0; j < feature.geometry.coordinates.length; j++) {
              const startPt: TMapLatLng = new window.Tmapv2.LatLng(
                feature.geometry.coordinates[j][1],
                feature.geometry.coordinates[j][0]
              );
              ar_line.push(startPt);
              pointArray.push(startPt);
            }
            const polylineOptions: PolylineOptions = {
              path: ar_line,
              strokeColor: "#ff0000",
              strokeWeight: 6,
              map: map,
            };
            const polyline: TMapPolyline = new window.Tmapv2.Polyline(
              polylineOptions
            );
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
        const geoData = newData;
        let markerCnt = 1;

        for (let i = 0; i < newData.length; i++) {
          const mData = newData[i];
          const type = mData[0].geometry.type;
          const pointType = mData[0].properties.pointType;
          const pointTypeCheck = false;

          if (pointType == "S") {
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
            const img = locationImg;
          } else if (mData[0].properties.pointType == "E") {
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
            const img = destinationImg;
          } else {
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
            markerCnt = i;
          }
        }

        const addMarker = (
          status: string,
          lon: number,
          lat: number,
          tag: number
        ) => {
          let markerLayer;
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

          const markerOptions = {
            position: new window.Tmapv2.LatLng(lat, lon),
            icon: imgURL,
            iconSize:
              imgURL === locationImg
                ? new window.Tmapv2.Size(15, 15)
                : new window.Tmapv2.Size(24, 24),
            map: map,
          };

          const marker: TMapMarker = new window.Tmapv2.Marker(markerOptions);

          // marker.tag = tag;
          // marker.addListener("dragend", (evt: any) => {
          //   markerListenerEvent(evt);
          // });
          // marker.addListener("drag", (evt: any) => {
          //   markerObject = markerList[tag];
          // });
          // markerList[tag] = marker;
          return marker;
        };

        addMarker("llStart", 127.02810900563199, 37.519892712436906, 1);
        addMarker("llEnd", 127.11971717230388, 37.49288934463672, 2);

        const startX = 127.02810900563199;
        const startY = 37.519892712436906;
        const endX = 127.11971717230388;
        const endY = 37.49288934463672;
        const passList = "";
        let prtcl;

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
            const prtcl = response.data;
            console.log(prtcl);

            const trafficColors = {
              extractStyles: true,
              /* 실제 교통정보가 표출되면 아래와 같은 Color로 Line이 생성됩니다. */
              trafficDefaultColor: "#636f63", //Default
              trafficType1Color: "#19b95f", //원할
              trafficType2Color: "#f15426", //지체
              trafficType3Color: "#ff970e", //정체
            };

            const styled_red = {
              fillColor: "#FF0000",
              fillOpacity: 0.2,
              strokeColor: "#FF0000",
              strokeWidth: 3,
              strokeDashstyle: "solid",
              pointRadius: 2,
              title: "this is a red line",
            };

            drawData(prtcl);
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
    };
  }, []);
  return <div id="map_div" style={{ width: "100%", height: "100%" }}></div>;
};

export default DriverReportMap;
