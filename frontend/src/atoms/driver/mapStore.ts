import { atom } from "jotai";

export const mapAtom = atom<any | null>(null);
export const routeDataAtom = atom<any | null>(null); // 필요한 경로 데이터 타입 설정
export const mapInitializedAtom = atom<boolean>(false);

export const startPointAtom = atom<{ lat: number; lon: number } | null>(null);
export const endPointAtom = atom<{ lat: number; lon: number } | null>(null); // 도착지 좌표
export const restStopsAtom = atom<{ lat: number; lon: number }[]>([]); // 휴게소 좌표 배열
export const polylineDataAtom = atom<any[]>([]);
