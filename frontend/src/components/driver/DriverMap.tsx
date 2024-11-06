import { useEffect } from "react";

const DriverMap: React.FC = () => {
  const API_KEY = "ugotdAvH6G8aPbsh0AIIa5Zapbw816TY2zIVCfQU";

  useEffect(() => {
    const initTmap = () => {
      const map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(37.52084364186228, 127.058908811749),
        width: "100%",
        height: "100%",
      });

      // const markerList = [];
      // const pointArray = [];

      // const addMarker = (
      //   status: string,
      //   lon: number,
      //   lat: number,
      //   tag: number
      // ) => {
      //   let markerLayer;
      //   let imgURL: string | undefined;
      //   switch (status) {
      //     case "llStart":
      //       imgURL = "/upload/tmap/marker/pin_r_m_s.png";
      //       break;
      //     case "llPass":
      //       imgURL = "/upload/tmap/marker/pin_b_m_p.png";
      //       break;
      //     case "llEnd":
      //       imgURL = "/upload/tmap/marker/pin_r_m_e.png";
      //       break;
      //     default:
      //       imgURL = undefined;
      //   }

      //   const marker = new Tmapv2.Marker({
      //     position: new Tmapv2.LatLng(lat, lon),
      //     icon: imgURL,
      //     map: map,
      //   });

      //   marker.tag = tag;
      //   marker.addListener("dragend", (evt) => {
      //     markerListenerEvent(evt);
      //   });
      //   marker.addListener("drag", (evt) => {
      //     markerObject = markerList[tag];
      //   });
      //   markerList[tag] = marker;
      //   return marker;
      // };

      // addMarker("llStart", 127.02810900563199, 37.519892712436906, 1);
      // addMarker("llEnd", 127.11971717230388, 37.49288934463672, 2);
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
