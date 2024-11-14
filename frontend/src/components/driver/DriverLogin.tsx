import { useAtom } from "jotai";
import { vehicleIdAtom, tokenAtom } from "@/atoms/driver/carInfo";
import axios from "axios";
import { useEffect } from "react";

const DriverLogin: React.FC = () => {
  const [, setVehicleId] = useAtom(vehicleIdAtom);
  const [, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    setToken(
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpYW1ub3Rkcml2ZXIiLCJ0eXBlIjoiYWNjZXNzIiwiYXV0aG9yaXRpZXMiOiJST0xFX0RSSVZFUiIsImV4cCI6MTczMTY2OTIxNH0.MMBNbps2FnTS7R4GMzvgDPIGuiSk5SLdVd6t28Y2nyE"
    );

    const fetchVehicleId = async () => {
      try {
        const response = await axios.get("/api/v1/driver/vehicle/info", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpYW1ub3Rkcml2ZXIiLCJ0eXBlIjoiYWNjZXNzIiwiYXV0aG9yaXRpZXMiOiJST0xFX0RSSVZFUiIsImV4cCI6MTczMTY2OTIxNH0.MMBNbps2FnTS7R4GMzvgDPIGuiSk5SLdVd6t28Y2nyE`,
          },
        });
        console.log(response);
        setVehicleId(response.data.data.vehicleId);
      } catch (error) {
        console.error("Failed to fetch vehicle ID:", error);
      }
    };
    fetchVehicleId();
  }, [setVehicleId]);

  return null;
};

export default DriverLogin;
