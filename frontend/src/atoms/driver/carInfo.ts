import { atom } from "jotai";

// 차량 id
export const vehicleIdAtom = atom<string | null>(null);

// 엑세스 토큰
export const tokenAtom = atom<string | null>(null);

// 리프래시 토큰
export const refreshTokenAtom = atom<string | null>(null);

// 멤버 아이디
export const memberIdAtom = atom<number | null>(null);

export const grantTypeAtom = atom<string | null>(null);

interface userInfoProps {
  memberType: string | null;
  memberName: string | null;
  additionalInfo: string | null;
}

export const userInfoAtom = atom<userInfoProps>({
  memberType: null,
  memberName: null,
  additionalInfo: null,
});
