import { atom } from "jotai";
import { User, Driver } from "@interfaces/manager";
import { TMap } from "@interfaces/Tmap";

export const userAtom = atom<User | null>(null);
export const driverAtom = atom<Driver | null>(null);
export const mapInstanceAtom = atom<TMap | null>(null);

export * from "@atoms/manager/user";
export {
  useDriverListWithFilters,
  searchQueryAtom,
  sortByAtom,
  driverTypeAtom,
} from "@atoms/manager/driver.ts";
