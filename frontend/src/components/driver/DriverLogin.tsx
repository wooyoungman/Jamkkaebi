import { useAtom } from "jotai";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";
import axios from "axios";
import { useEffect } from "react";

const DriverLogin: React.FC = () => {
  const [, setVehicleId] = useAtom(vehicleIdAtom);
  const [token, setToken] = useAtom(tokenAtom);

  // Token을 설정하는 useEffect 훅
  useEffect(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpYW1ub3Rkcml2ZXIiLCJ0eXBlIjoiYWNjZXNzIiwiYXV0aG9yaXRpZXMiOiJST0xFX0RSSVZFUiIsImV4cCI6MTczMTc1Nzk5NH0._O7c3lK4CTO0HVsWu4mTeUyZreln08lzknG2g3LqDkw"
    );
  }, [setToken]);

  // Token이 설정된 후에만 API 요청을 보내는 useEffect 훅
  useEffect(() => {
    const fetchVehicleId = async () => {
      if (!token) return; // Token이 없으면 API 호출 중지

      try {
        const response = await axios.get(
          "https://k11c106.p.ssafy.io/api/v1/driver/vehicle/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response);
        setVehicleId(response.data.data.vehicleId);
      } catch (error) {
        console.error("Failed to fetch vehicle ID:", error);
      }
    };

    fetchVehicleId();
  }, [token, setVehicleId]); // Token이 설정된 후에만 fetchVehicleId가 실행됨

  return null;
};

export default DriverLogin;
