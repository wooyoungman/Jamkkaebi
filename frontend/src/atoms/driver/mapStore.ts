import { atom } from 'jotai';

export const mapAtom = atom<window.Tmapv2.Map | null>(null);
export const routeDataAtom = atom<any | null>(null); // 필요한 경로 데이터 타입 설정
export const mapInitializedAtom = atom<boolean>(false);
