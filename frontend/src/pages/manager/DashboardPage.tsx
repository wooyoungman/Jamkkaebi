import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";
import MapContainer from "@components/manager/MapContainer";
import DriverMarker from "@components/manager/DriverMarker";
import RoutePolyline from "@components/manager/RoutePolyline";
import DriverInfoModal from "@components/manager/DriverInfoModal";
import AlertModal from "@components/manager/AlertModal";
import { MapDriver } from "@interfaces/manager";
import { dummyMapDrivers, dummySleepEvent } from "@interfaces/dummydrivers";

const DashboardPage = () => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [showDriverInfo, setShowDriverInfo] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    driverName: "",
    eventTime: "",
    eventLocation: "",
  });

  const { data: drivers = [] } = useQuery<MapDriver[]>({
    queryKey: ["drivers"],
    queryFn: async () => {
      return dummyMapDrivers;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertInfo({
        driverName: dummySleepEvent.driverName,
        eventTime: dummySleepEvent.time,
        eventLocation: dummySleepEvent.location,
      });
      setShowAlert(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardPage.Container>
      <DashboardPage.MapSection>
        <MapContainer
          width="100%"
          height="100%"
          initialCenter={{ lat: 37.5666805, lng: 126.9784147 }}
        >
          {drivers.map((driver) => (
            <DriverMarker
              key={driver.id}
              position={driver.location}
              driverId={driver.id}
              onClick={() => {
                setSelectedDriver(driver.id);
                setShowDriverInfo(true);
              }}
            />
          ))}
          {selectedDriver && (
            <RoutePolyline
              path={drivers.find((d) => d.id === selectedDriver)?.route || []}
              color="#4A90E2"
              width={3}
            />
          )}
        </MapContainer>

        {showDriverInfo && selectedDriver && (
          <DashboardPage.DriverOverlay>
            <DriverInfoModal
              isOpen={showDriverInfo}
              onClose={() => setShowDriverInfo(false)}
              driver={drivers.find((d) => d.id === selectedDriver)!}
            />
          </DashboardPage.DriverOverlay>
        )}
      </DashboardPage.MapSection>

      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        {...alertInfo}
      />
    </DashboardPage.Container>
  );
};

DashboardPage.Container = styled.div`
  position: relative;
  height: 100vh;
  margin: 10px;
  border-radius: 16px;
`;

DashboardPage.MapSection = styled.div`
  width: 100%;
  height: 100vh;
  border-radius: 16px;
`;

DashboardPage.DriverOverlay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;

export default DashboardPage;
