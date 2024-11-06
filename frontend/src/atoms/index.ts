// 로그인 후 user에 대한 상태관리
import { atom } from "jotai";
import { User } from "@/interfaces/manager";

export const userAtom = atom<User | null>(null);
