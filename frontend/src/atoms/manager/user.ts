import { atom } from "jotai";
import { LoginResponse } from "@interfaces/manager";

// 타입 정의
interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  memberId: number | null; // LoginResponse에 있는 memberId 추가
}

// auth 상태를 관리하는 atom
export const authAtom = atom<AuthState>({
  isAuthenticated: !!localStorage.getItem("accessToken"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  memberId: null,
});

// login mutation 성공 시 사용할 atom
export const loginAtom = atom(
  null,
  (get, set, loginResponse: LoginResponse) => {
    const { accessToken, refreshToken, memberId } = loginResponse;

    // localStorage에 저장
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    // atom 상태 업데이트
    set(authAtom, {
      isAuthenticated: true,
      accessToken,
      refreshToken,
      memberId,
    });
  }
);

// logout용 atom
// export const logoutAtom = atom(null, (get, set) => {
//   // localStorage에서 제거
//   localStorage.removeItem("accessToken");
//   localStorage.removeItem("refreshToken");

//   // atom 상태 초기화
//   set(authAtom, {
//     isAuthenticated: false,
//     accessToken: null,
//     refreshToken: null,
//     memberId: null,
//   });

// });

// auth 관련 selector atoms (필요한 경우)
export const isAuthenticatedAtom = atom((get) => get(authAtom).isAuthenticated);
export const memberIdAtom = atom((get) => get(authAtom).memberId);
