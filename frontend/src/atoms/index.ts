// 로그인 후 user에 대한 상태관리
import { atom } from "jotai";
import { User, Driver } from "@/interfaces/manager";

export const userAtom = atom<User | null>(null);
export const driverAtom = atom<Driver | null>(null);

export * from "@atoms/manager/user";
export {
  useDriverListWithFilters,
  searchQueryAtom,
  sortByAtom,
  driverTypeAtom,
} from "@atoms/manager/driver.ts";
