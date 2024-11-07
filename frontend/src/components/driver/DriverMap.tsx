import { useEffect } from "react";
import axios from "axios";
import destinationImg from "@/assets/destinationImg.png";
import locationImg from "@/assets/locationImg.png";
import { TMapInstance, MapOptions, TMapLatLng, TMapMarker, PolylineOptions, TMapPolyline } from "@/interfaces/Tmap"; // 타입 가져오기


const DriverMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;

  useEffect(() => {
    const initTmap = () => {
      // 1. 지도 띄우기
      const map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.52084364186228, 127.058908811749),
        width: "100%",
        height: "100%",
        zoom: 14,
        zoomControl: true,
        scrollwheel: true,
      });

      // // 2. 출발지, 도착지 심볼 찍기
      // // 출발지
      // const marker_s = new Tmapv2.Marker({
      //   position: new Tmapv2.LatLng(37.534066, 126.958973),
      //   icon: locationImg,
      //   iconSize: new Tmapv2.Size(15, 15),
      //   map: map,
      // });
      // // 도착지
      // const marker_e = new Tmapv2.Marker({
      //   position: new Tmapv2.LatLng(37.520287, 126.932661),
      //   icon: destinationImg,
      //   iconSize: new Tmapv2.Size(24, 24),
      //   map: map,
      // });

      const new_polyLine = [];
      const new_Click_polyLine = [];

      let routeData: any;
      // let geoData: any[];

      const drawData = (data) => {
        routeData = data;
        const resultStr = "";
        const distance = 0;
        const idx = 1;
        const newData = [];
        let equalData = [];
        let pointId1 = "-1234567";
        let ar_line = [];

        for (let i = 0; i < data.features.length; i++) {
          const feature = data.features[i];
          if (feature.geometry.type == "LineString") {
            ar_line = [];
            for (let j = 0; j < feature.geometry.coordinates.length; j++) {
              const startPt = new Tmapv2.LatLng(
                feature.geometry.coordinates[j][1],
                feature.geometry.coordinates[j][0]
              );
              ar_line.push(startPt);
              pointArray.push(feature.geometry.coordinates[j]);
            }
            const polyline = new Tmapv2.Polyline({
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
        const geoData = newData;
        let markerCnt = 1;
        for (let i = 0; i < newData.length; i++) {
          const mData = newData[i];
          const type = mData[0].geometry.type;
          const pointType = mData[0].properties.pointType;
          const pointTypeCheck = false;
          if (mData[0].properties.pointType == "S") {
            const img = locationImg;
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
          } else if (mData[0].properties.pointType == "E") {
            const img = destinationImg;
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
          } else {
            markerCnt = i;
            const lon = mData[0].geometry.coordinates[0];
            const lat = mData[0].geometry.coordinates[1];
          }
        }
      };

      const markerList = [];
      const pointArray = [];

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

        const marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(lat, lon),
          icon: imgURL,
          iconSize:
            imgURL === locationImg
              ? new Tmapv2.Size(15, 15)
              : new Tmapv2.Size(24, 24),
          map: map,
        });

        marker.tag = tag;
        marker.addListener("dragend", (evt) => {
          markerListenerEvent(evt);
        });
        marker.addListener("drag", (evt) => {
          markerObject = markerList[tag];
        });
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
  }, []);
  return <div id="map_div" style={{ width: "100%", height: "100%" }}></div>;
};

export default DriverMap;
