import { useState, useCallback, useEffect } from "react";
import { DriverState, BrainData, AlertInfo } from "@interfaces/manager";

const SPRING_WS_URL = "wss://k11c106.p.ssafy.io/ws/v1/manager";

interface WebSocketResponse {
  count: number;
  data: Array<{
    driverId: number;
    brain: {
      delta: number;
      theta: number;
      lowAlpha: number;
      highAlpha: number;
      lowBeta: number;
      highBeta: number;
      lowGamma: number;
      highGamma: number;
    };
    muscle: number;
    predictions?: {
      attention?: number;
      meditation?: number;
      classification?: "NORMAL" | "ASLEEP";
    };
    coordinate: [number, number];
  }>;
}

export const useWebSocketController = (managerId: number) => {
  const [springSocket, setSpringSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);
  const [realtimeDriverStates, setRealtimeDriverStates] = useState<
    DriverState[]
  >([]);
  const [realtimeLocations, setRealtimeLocations] = useState<
    Record<string, { lat: number; lng: number }>
  >({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    driverName: "",
    eventTime: "",
    eventLocation: {
      lat: 37.5666805,
      lng: 126.9784147
    }
  });


  const MAX_RECONNECT_ATTEMPTS = 5;
  const RECONNECT_DELAY = 3000;

  // 데이터 요청 함수
  const requestData = useCallback(
    (socket: WebSocket) => {
      if (socket.readyState === WebSocket.OPEN) {
        const requestPayload = {
          type: "GET",
          managerId: managerId,
        };
        socket.send(JSON.stringify(requestPayload));
        console.log("Data request sent:", requestPayload);
      }
    },
    [managerId]
  );

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
        requestData(newSpringSocket);
      };

      newSpringSocket.onmessage = (event) => {
        try {
          const response = JSON.parse(event.data) as WebSocketResponse;

          response.data.forEach((data) => {
            // BrainData 형식으로 변환하여 처리
            const brainData: BrainData = {
              driverId: data.driverId,
              predictions: data.predictions
                ? {
                    classification: data.predictions.classification || "NORMAL",
                  }
                : undefined,
              coordinate: data.coordinate,
            };

            // 위치 정보 업데이트
            if (brainData.coordinate) {
              const location = {
                lng: brainData.coordinate[0],
                lat: brainData.coordinate[1],
              };

              setRealtimeLocations((prev) => ({
                ...prev,
                [brainData.driverId]: location,
              }));

              // 졸음 상태 확인 및 알림 설정
              if (data.predictions?.classification === "ASLEEP") {
                setAlertInfo({
                  driverName: `Driver ${brainData.driverId}`,
                  eventTime: new Date().toLocaleString(),
                  eventLocation: {
                    lat: location.lat,
                    lng: location.lng
                  }
                });
                setShowAlert(true);
              }
            }

            // 운전자 상태 업데이트
            if (data.predictions?.classification) {
              setRealtimeDriverStates((prev) => {
                const existingIndex = prev.findIndex(
                  (state) => state.driverId === brainData.driverId
                );

                const newState: DriverState = {
                  driverId: brainData.driverId,
                  drowsy_level:
                    data.predictions?.classification === "ASLEEP" ? 1 : 0,
                  concentration_level: data.predictions?.attention
                    ? data.predictions.attention / 100
                    : 1,
                };

                if (existingIndex >= 0) {
                  const newStates = [...prev];
                  newStates[existingIndex] = newState;
                  return newStates;
                }
                return [...prev, newState];
              });
            }
          });
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
  }, [connectionAttempts, requestData]);

  // 주기적으로 데이터 요청하는 기능
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (springSocket && isConnected) {
      // 30초마다 데이터 요청
      intervalId = setInterval(() => {
        requestData(springSocket);
      }, 30000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [springSocket, isConnected, requestData]);

  useEffect(() => {
    connectSpringSocket();

    return () => {
      if (springSocket && springSocket.readyState === WebSocket.OPEN) {
        springSocket.close();
      }
    };
  }, [connectSpringSocket]);

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
