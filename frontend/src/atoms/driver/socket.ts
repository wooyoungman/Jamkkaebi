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
  predictions: {
    attention: number;
    meditation: number;
    classification: string;
  };
  coordinate: any[];
}

// WebSocket에서 수신한 데이터를 저장하는 atom
export const driverStateDataAtom = atom<FastAPIData | null>(null);
export const secondDriverStateDataAtom = atom<ServerData | null>(null);

// WebSocket 연결 상태 관리
export const initializeWebSocket = (
  setDriverStateData: (value: FastAPIData) => void
) => {
  const socket = new WebSocket("wss://k11c106.p.ssafy.io/fastapi/ws");

  socket.onopen = () => {
    console.log("WebSocket connection opened");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    setDriverStateData(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error: ", error);
  };

  socket.onclose = () => {
    console.log("WebSocket connection closed");
  };

  return socket;
};
