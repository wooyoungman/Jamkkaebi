import { useState, useCallback, useEffect } from "react";
import { DriverState, BrainData } from "@interfaces/manager";

const SPRING_WS_URL = "wss://k11c106.p.ssafy.io/ws/v1/device/data";
const FASTAPI_WS_URL = "wss://k11c106.p.ssafy.io/fastapi/ws";

export const useWebSocketController = (driversWithRoutes: any[]) => {
  const [springSocket, setSpringSocket] = useState<WebSocket | null>(null);
  const [fastApiSocket, setFastApiSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [realtimeDriverStates, setRealtimeDriverStates] = useState<
    DriverState[]
  >([]);
  const [realtimeLocations, setRealtimeLocations] = useState<
    Record<string, { lat: number; lng: number }>
  >({});
  const [needFastApiConnection, setNeedFastApiConnection] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    driverName: "",
    eventTime: "",
    eventLocation: "",
  });

  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  // FastAPI WebSocket 연결 함수
  const connectFastApiSocket = useCallback(() => {
    const newFastApiSocket = new WebSocket(FASTAPI_WS_URL);

    newFastApiSocket.onopen = () => {
      console.log("FastAPI WebSocket connected");
    };

    newFastApiSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.predictions?.classification) {
          setRealtimeDriverStates((prev) => {
            const existingIndex = prev.findIndex(
              (state) => state.driverId === data.driverId
            );
            const newState = {
              driverId: data.driverId,
              drowsy_level:
                data.predictions.classification === "ASLEEP" ? 1 : 0,
              concentration_level: 1,
            };

            if (existingIndex >= 0) {
              const newStates = [...prev];
              newStates[existingIndex] = newState;
              return newStates;
            }
            return [...prev, newState];
          });
        }
      } catch (error) {
        console.error("Error parsing FastAPI WebSocket message:", error);
      }
    };

    setFastApiSocket(newFastApiSocket);
  }, []);

  // Spring WebSocket 연결 함수
  const connectSpringSocket = useCallback(() => {
    if (connectionAttempts >= MAX_RECONNECT_ATTEMPTS) {
      console.log("Max reconnection attempts reached");
      return;
    }

    try {
      const newSpringSocket = new WebSocket(SPRING_WS_URL);

      newSpringSocket.onopen = () => {
        console.log("Spring WebSocket connected");
        setIsConnected(true);
        setConnectionAttempts(0);
      };

      newSpringSocket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as BrainData;

          // 좌표 데이터 처리
          if (data.coordinate) {
            setRealtimeLocations((prev) => ({
              ...prev,
              [data.driverId]: {
                lng: data.coordinate[0],
                lat: data.coordinate[1],
              },
            }));
          }

          // classification 데이터 처리
          if (data.predictions?.classification) {
            setRealtimeDriverStates((prev) => {
              const existingIndex = prev.findIndex(
                (state) => state.driverId === data.driverId
              );
              const newState = {
                driverId: data.driverId,
                drowsy_level:
                  data.predictions?.classification === "ASLEEP" ? 1 : 0,
                concentration_level: 1,
              };

              if (existingIndex >= 0) {
                const newStates = [...prev];
                newStates[existingIndex] = newState;
                return newStates;
              }
              return [...prev, newState];
            });
          } else {
            // classification이 없는 경우 FastAPI 연결 필요
            setNeedFastApiConnection(true);
          }
        } catch (error) {
          console.error("Error parsing Spring WebSocket message:", error);
        }
      };

      newSpringSocket.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      };

      newSpringSocket.onclose = () => {
        console.log("WebSocket closed");
        setIsConnected(false);
        setSpringSocket(null);

        if (connectionAttempts < MAX_RECONNECT_ATTEMPTS) {
          setTimeout(() => {
            setConnectionAttempts((prev) => prev + 1);
            connectSpringSocket();
          }, RECONNECT_DELAY);
        }
      };

      setSpringSocket(newSpringSocket);
    } catch (error) {
      console.error("Error creating Spring WebSocket:", error);
    }
  }, [connectionAttempts]);

  useEffect(() => {
    connectSpringSocket();

    return () => {
      if (springSocket && springSocket.readyState === WebSocket.OPEN) {
        springSocket.close();
      }
    };
  }, [connectSpringSocket]);

  useEffect(() => {
    if (needFastApiConnection && !fastApiSocket) {
      connectFastApiSocket();
    }

    return () => {
      if (fastApiSocket && fastApiSocket.readyState === WebSocket.OPEN) {
        fastApiSocket.close();
      }
    };
  }, [needFastApiConnection, fastApiSocket, connectFastApiSocket]);

  return {
    isConnected,
    connectionAttempts,
    realtimeDriverStates,
    realtimeLocations,
    showAlert,
    alertInfo,
    setShowAlert,
  };
};
