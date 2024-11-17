// import { useEffect } from "react";
// import { useAtom } from "jotai";
// import {
//   mapAtom,
//   routeDataAtom,
//   mapInitializedAtom,
//   startPointAtom,
//   endPointAtom,
//   restStopsAtom,
// } from "@/atoms/driver/mapStore";
// import { serverDriverStateDataAtom } from "@/atoms/driver/socket";
// import axios from "axios";
// import destinationImg from "@/assets/destinationImg.png";
// import locationImg from "@/assets/locationImg.png";
// import restStopImg from "@/assets/restStopImg.png";
// import { TMapMarker } from "@/interfaces/Tmap";

// interface CustomTMapMarker extends TMapMarker {
//   tag: number;
// }

// const DriverMap: React.FC = () => {
//   const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
//   const [map, setMap] = useAtom(mapAtom);
//   const [routeData, setRouteData] = useAtom(routeDataAtom);
//   const [mapInitialized, setMapInitialized] = useAtom(mapInitializedAtom);
//   const [startPoint, setStartPoint] = useAtom(startPointAtom);
//   const [endPoint, setEndPoint] = useAtom(endPointAtom);
//   const [restStops, setRestStops] = useAtom(restStopsAtom);

//   const [serverDriverStateData] = useAtom(serverDriverStateDataAtom);

//   useEffect(() => {
//     // console.log("Map initialized");
//     const markerList: CustomTMapMarker[] = [];
//     const polylineList: any[] = [];

//     const initTmap = async () => {
//       // 1. 지도 띄우기
//       const mapDiv = document.getElementById("map_div") as HTMLElement;

//       const centerPoint = startPoint
//         ? new window.Tmapv2.LatLng(startPoint.lat, startPoint.lon)
//         : new window.Tmapv2.LatLng(35.20531229555332, 126.81156301307217); // 기본 좌표

//       const map = new window.Tmapv2.Map(mapDiv, {
//         center: centerPoint,
//         width: "100%",
//         height: "100%",
//         zoom: 14,
//         zoomControl: true,
//         scrollwheel: true,
//       });

//       // console.log("1. 지도 띄우기");
//       setMap(map);
//       setMapInitialized(true);

//       const clearMap = () => {
//         // Remove all markers
//         markerList.forEach((marker) => marker.setMap(null));
//         markerList.length = 0; // Clear marker list

//         // Remove all polylines
//         polylineList.forEach((polyline) => polyline.setMap(null));
//         polylineList.length = 0; // Clear polyline list
//         // console.log("Map cleared");
//       };

//       const drawData = (data: any) => {
//         // clearMap();

//         for (const feature of data.features) {
//           if (feature.geometry.type === "LineString") {
//             const ar_line = feature.geometry.coordinates.map(
//               (coord: [number, number]) =>
//                 new window.Tmapv2.LatLng(coord[1], coord[0])
//             );
//             const polyline = new window.Tmapv2.Polyline({
//               path: ar_line,
//               strokeColor: "#00ff00",
//               strokeWeight: 6,
//               map: map,
//             });
//             polylineList.push(polyline);
//           }
//         }
//         // console.log("Route drawn on map");
//       };

//       const addMarker = (
//         status: string,
//         lon: number,
//         lat: number,
//         tag: number
//       ) => {
//         let imgURL: string | undefined;
//         switch (status) {
//           case "llStart":
//             imgURL = locationImg;
//             break;
//           case "llPass":
//             imgURL = restStopImg;
//             break;
//           case "llEnd":
//             imgURL = destinationImg;
//             break;
//           default:
//             imgURL = undefined;
//         }
//         // console.log(
//         //   `Adding marker - Status: ${status}, Lat: ${lat}, Lon: ${lon}`
//         // );

//         const marker = new window.Tmapv2.Marker({
//           position: new window.Tmapv2.LatLng(lat, lon),
//           icon: imgURL,
//           iconSize:
//             imgURL === locationImg
//               ? new window.Tmapv2.Size(15, 15)
//               : new window.Tmapv2.Size(30, 30),
//           map: map,
//         }) as CustomTMapMarker;

//         marker.tag = tag;
//         markerList.push(marker);

//         if (status === "llPass") {
//           setRestStops((prev) => [...prev, { lat, lon, tag }]);

//           marker.addListener("click", () => {
//             // console.log(`Clicked on llPass marker at Lat: ${lat}, Lon: ${lon}`);

//             setRestStops((prev) =>
//               prev.filter((stop) => stop.lat !== lat && stop.lon !== lon)
//             );

//             // 좌표 재설정: 서버 데이터 사용
//             if (serverDriverStateData?.coordinate) {
//               const startLat = serverDriverStateData.coordinate[1];
//               const startLon = serverDriverStateData.coordinate[0];
//               setStartPoint({ lat: startLat, lon: startLon });

//               clearMap();
//               addMarker("llStart", startLon, startLat, 1); // 새 출발지 마커 추가
//               addMarker("llEnd", lon, lat, 2); // 목적지 마커 유지

//               // 경로 재계산
//               fetchRouteData(startLon, startLat, lon, lat);
//             } else {
//               console.error("Server data is not available for coordinates.");
//             }
//           });
//         }

//         return marker;
//       };

//       const fetchRouteData = async (
//         startX: number,
//         startY: number,
//         endX: number,
//         endY: number
//       ) => {
//         try {
//           const response = await axios.post(
//             "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
//             {
//               startX,
//               startY,
//               endX,
//               endY,
//               passList: "",
//               reqCoordType: "WGS84GEO",
//               resCoordType: "WGS84GEO",
//               angle: "172",
//               searchOption: "0",
//               trafficInfo: "Y",
//             },
//             {
//               headers: {
//                 appKey: API_KEY,
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//             }
//           );
//           setRouteData(response.data);
//           drawData(response.data);
//           setStartPoint({ lat: startY, lon: startX });
//           setEndPoint({ lat: endY, lon: endX });
//           // console.log("Fetched and Renewaled Data");
//         } catch (error) {
//           console.error("Error fetching route data:", error);
//         }
//       };

//       // // 여기서부터 손봐야함
//       // if (startPoint) {
//       //   console.log("Start point exists");
//       //   addMarker("llStart", startPoint.lon, startPoint.lat, 1);
//       //   map.setCenter(new window.Tmapv2.LatLng(startPoint.lon, startPoint.lon));
//       // } else {
//       //   console.log("Start point didn't exists");
//       //   if (navigator.geolocation) {
//       //     navigator.geolocation.getCurrentPosition(
//       //       (position) => {
//       //         const userLat = position.coords.latitude;
//       //         const userLon = position.coords.longitude;
//       //         addMarker("llStart", userLon, userLat, 1);
//       //         setStartPoint({ lat: userLat, lon: userLon });

//       //         map.setCenter(new window.Tmapv2.LatLng(userLat, userLon));
//       //       },
//       //       (error) => console.error("Geolocation error: ", error)
//       //     );
//       //   }
//       // }

//       if (serverDriverStateData?.coordinate) {
//         const newLat = serverDriverStateData.coordinate[1];
//         const newLon = serverDriverStateData.coordinate[0];

//         // 상태 업데이트
//         setStartPoint({ lat: newLat, lon: newLon });

//         // 업데이트된 좌표를 직접 사용하여 마커 추가
//         addMarker("llStart", newLon, newLat, 1);
//         // addMarker("llStart", 126.81110170278345, 35.2054670279613, 1);

//         // startPoint 대신 직접 사용
//         map.setCenter(new window.Tmapv2.LatLng(newLat, newLon));
//       }

//       if (endPoint) {
//         // console.log("End point exists");
//         addMarker("llEnd", endPoint.lon, endPoint.lat, 2);
//       } else {
//         // console.log("End point didn't exists");
//         addMarker("llEnd", 126.81110170278345, 35.2054670279613, 2);
//         setEndPoint({ lat: 35.2054670279613, lon: 126.81110170278345 });
//       }

//       restStops.forEach((stop) => {
//         addMarker("llPass", stop.lon, stop.lat, stop.tag);
//         // console.log("Added rest stop marker at:", stop.lat, stop.lon);
//       });

//       if (startPoint) {
//         const startX = startPoint.lon;
//         const startY = startPoint.lat;
//         const endX = 126.81110170278345;
//         const endY = 35.2054670279613;

//         if (routeData) {
//           drawData(routeData);
//         } else {
//           try {
//             const response = await axios.post(
//               "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
//               {
//                 startX,
//                 startY,
//                 endX,
//                 endY,
//                 passList: "",
//                 reqCoordType: "WGS84GEO",
//                 resCoordType: "WGS84GEO",
//                 angle: "172",
//                 searchOption: "0",
//                 trafficInfo: "Y",
//               },
//               {
//                 headers: {
//                   appKey: API_KEY,
//                   "Content-Type": "application/x-www-form-urlencoded",
//                 },
//               }
//             );
//             setRouteData(response.data);
//             drawData(response.data);
//           } catch (error) {
//             console.error("Error fetching route data:", error);
//           }
//         }
//       } else {
//         console.error("Start point is not defined.");
//       }
//     };

//     if (!window.Tmapv2) {
//       const script = document.createElement("script");
//       script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${API_KEY}`;
//       script.async = true;
//       script.onload = initTmap;
//       document.head.appendChild(script);
//     } else {
//       initTmap();
//     }
//   }, [serverDriverStateData]);
//   return <div id="map_div" style={{ width: "100%", height: "100%" }}></div>;
// };

// export default DriverMap;
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

const DriverMap: React.FC = () => {
  const API_KEY = import.meta.env.VITE_TMAP_API_KEY;
  const [map, setMap] = useAtom(mapAtom);
  const [routeData, setRouteData] = useAtom(routeDataAtom);
  const [mapInitialized, setMapInitialized] = useAtom(mapInitializedAtom);
  const [startPoint, setStartPoint] = useAtom(startPointAtom);
  const [endPoint, setEndPoint] = useAtom(endPointAtom);
  const [restStops, setRestStops] = useAtom(restStopsAtom);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLon = position.coords.longitude;

          console.log("User location retrieved:", userLat, userLon);
          // 사용자의 위치를 startPointAtom에 저장
          setStartPoint({ lat: userLat, lon: userLon });
        },
        (error) => console.error("Geolocation error: ", error)
      );
    }

    console.log("Map initialized");
    const markerList: CustomTMapMarker[] = [];
    const polylineList: any[] = [];

    const initTmap = () => {
      // 1. 지도 띄우기
      const mapDiv = document.getElementById("map_div") as HTMLElement;

      const centerPoint = startPoint
        ? new window.Tmapv2.LatLng(startPoint.lat, startPoint.lon)
        : new window.Tmapv2.LatLng(35.20531229555332, 126.81156301307217); // 기본 좌표

      const map = new window.Tmapv2.Map(mapDiv, {
        center: centerPoint,
        width: "100%",
        height: "100%",
        zoom: 14,
        zoomControl: true,
        scrollwheel: true,
      });

      console.log("1. 지도 띄우기");
      setMap(map);
      setMapInitialized(true);

      const clearMap = () => {
        // Remove all markers
        markerList.forEach((marker) => marker.setMap(null));
        markerList.length = 0; // Clear marker list

        // Remove all polylines
        polylineList.forEach((polyline) => polyline.setMap(null));
        polylineList.length = 0; // Clear polyline list
        console.log("Map cleared");
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
        console.log("Route drawn on map");
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
        console.log(
          `Adding marker - Status: ${status}, Lat: ${lat}, Lon: ${lon}`
        );

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
          setRestStops((prev) => [...prev, { lat, lon, tag }]);

          marker.addListener("click", () => {
            console.log(`Clicked on llPass marker at Lat: ${lat}, Lon: ${lon}`);

            // // 클릭된 llPass 마커 제거
            // marker.setMap(null);

            setRestStops((prev) =>
              prev.filter((stop) => stop.lat !== lat && stop.lon !== lon)
            );

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
          setStartPoint({ lat: startY, lon: startX });
          setEndPoint({ lat: endY, lon: endX });
          console.log("Fetched and Renewaled Data");
        } catch (error) {
          console.error("Error fetching route data:", error);
        }
      };

      if (startPoint) {
        console.log("Start point exists");
        addMarker("llStart", startPoint.lon, startPoint.lat, 1);
        map.setCenter(new window.Tmapv2.LatLng(startPoint.lon, startPoint.lon));
      } else {
        console.log("Start point didn't exists");
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLon = position.coords.longitude;
              addMarker("llStart", userLon, userLat, 1);
              setStartPoint({ lat: userLat, lon: userLon });

              map.setCenter(new window.Tmapv2.LatLng(userLat, userLon));
            },
            (error) => console.error("Geolocation error: ", error)
          );
        }
      }

      if (endPoint) {
        console.log("End point exists");
        addMarker("llEnd", endPoint.lon, endPoint.lat, 2);
      } else {
        console.log("End point didn't exists");
        addMarker("llEnd", 127.11971717230388, 37.49288934463672, 2);
        setEndPoint({ lat: 37.49288934463672, lon: 127.11971717230388 });
      }
      restStops.forEach((stop) => {
        addMarker("llPass", stop.lon, stop.lat, stop.tag);
        console.log("Added rest stop marker at:", stop.lat, stop.lon);
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const startX = position.coords.longitude;
          const startY = position.coords.latitude;
          const endX = 127.11971717230388;
          const endY = 37.49288934463672;
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
