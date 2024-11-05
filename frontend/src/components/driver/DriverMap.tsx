import { useEffect } from "react";

const DriverMap: React.FC = () => {
  const API_KEY = "ugotdAvH6G8aPbsh0AIIa5Zapbw816TY2zIVCfQU";

  useEffect(() => {
    const loadTmapScript = () => {
      return new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = `https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${API_KEY}`;
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
      });
    };

    loadTmapScript().then(() => {
      const { Tmapv2 } = window;

      if (Tmapv2) {
        const mapContainer = document.getElementById("mapContainer");
        if (mapContainer) {
          const map = new Tmapv2.Map(mapContainer, {
            // mapContainer 참조를 전달
            center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
            width: "100%",
            height: "100%",
            zoom: 15,
          });
        }
      }
    });

    return () => {
      // 클린업: 스크립트 제거
      const existingScript = document.querySelector(
        `script[src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${API_KEY}"]`
      );
      if (existingScript) existingScript.remove();
    };
  }, [API_KEY]);

  return <div id="mapContainer" style={{ width: "100%", height: "100%" }} />;
};

export default DriverMap;
