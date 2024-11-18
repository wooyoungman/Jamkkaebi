// atoms.ts
import { atom } from "jotai";

// WebSocket 데이터 타입 정의
interface FastAPIData {
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
  predictions: {
    attention: number;
    meditation: number;
    classification: string;
  };
}

interface ServerData {
  driverId: number;
  brain: {
    delta: number | null;
    theta: number | null;
    lowAlpha: number | null;
    highAlpha: number | null;
    lowBeta: number | null;
    highBeta: number | null;
    lowGamma: number | null;
    highGamma: number | null;
  };
  muscle: number | null;
  predictions: {
    attention: number | null;
    meditation: number | null;
    classification: string | null;
  };
  coordinate: number[];
}

// WebSocket에서 수신한 데이터를 저장하는 atom
export const driverStateDataAtom = atom<FastAPIData | null>(null);
export const serverDriverStateDataAtom = atom<ServerData | null>(null);
export const isFastAPISuccessAtom = atom<boolean | null>(null);
export const startPointAtom = atom<{ lat: number; lon: number } | null>({
  lat: 34.75746280159556,
  lon: 126.35492245670288,
});

// FastAPI WebSocket 연결 상태 관리
export const initializeWebSocket = (
  setDriverStateData: (value: FastAPIData) => void,
  setIsFastAPISuccess: (value: boolean | null) => void
) => {
  const socket = new WebSocket("wss://k11c106.p.ssafy.io/fastapi/ws");

  socket.onopen = () => {
    console.log("FastAPI WebSocket connection opened");

    // FastAPI에 데이터 요청
    const payload = JSON.stringify({ type: "GET" });
    socket.send(payload);
    console.log("Request payload sent to FastAPI:", payload);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    // FastAPI 응답(response)을 매 데이터마다 확인
    if (data.response !== undefined) {
      console.log("FastAPI response received:", data.response);
      setIsFastAPISuccess(data.response); // response에 따라 FastAPI 성공 여부 업데이트
    } else {
      console.log("Received data without response:", data);
    }

    // 데이터를 FastAPI 상태로 업데이트
    if (data.brain || data.predictions) {
      console.log("FastAPI 데이터 수신:", data);
      setDriverStateData(data); // FastAPI 데이터를 업데이트
    }
  };

  socket.onerror = (error) => {
    console.error("FastAPI WebSocket error: ", error);
  };

  socket.onclose = () => {
    console.log("FastAPI WebSocket connection closed");
  };

  return socket;
};

// 서버 WebSocket 연결 상태 관리
export const initializeServerWebSocket = (
  setServerDriverStateData: (value: ServerData) => void,
  setStartPoint: (value: { lat: number; lon: number }) => void, // 추가
  driverId: number
) => {
  const serverSocket = new WebSocket("wss://k11c106.p.ssafy.io/ws/v1/driver");

  serverSocket.onopen = () => {
    console.log("WebSocket connection opened");

    // WebSocket 연결이 성공적으로 열리면 데이터 요청
    const payload = JSON.stringify({
      type: "GET",
      driverId: driverId, // 요청할 driverId
    });

    serverSocket.send(payload); // 요청 전송
    console.log("Request payload sent:", payload);
  };

  serverSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    setServerDriverStateData(data);

    // startPointAtom 업데이트
    if (
      data.coordinate &&
      Array.isArray(data.coordinate) &&
      data.coordinate.length === 2
    ) {
      const [lon, lat] = data.coordinate; // WebSocket에서 받은 좌표
      setStartPoint({ lat, lon }); // startPointAtom 업데이트
      console.log("Updated startPointAtom with coordinates:", { lat, lon });
    } else {
      console.error("Invalid coordinate data:", data.coordinate);
    }
  };

  serverSocket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return serverSocket;
};
