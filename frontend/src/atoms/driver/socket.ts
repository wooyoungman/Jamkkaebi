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
