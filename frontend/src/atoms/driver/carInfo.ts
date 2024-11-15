import { atom } from "jotai";

// 차량 id
export const vehicleIdAtom = atom<string | null>(null);

// 엑세스 토큰
export const tokenAtom = atom<string | null>(null);