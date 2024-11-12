import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { useDriverList } from "@queries/index";
import {
  DriverList,
  DriverResponse,
  convertToDriver,
} from "@interfaces/manager";

// Atoms
export const searchQueryAtom = atom("");
export const sortByAtom = atom<"latest" | "name">("latest");
export const driverTypeAtom = atom<"managed" | "unmanaged">("unmanaged");

// Custom Hook
export const useDriverListWithFilters = () => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const sortBy = useAtomValue(sortByAtom);
  const driverType = useAtomValue(driverTypeAtom);

  const { data, isLoading, isError } = useDriverList(driverType);

  const filteredAndSortedDrivers = useMemo(() => {
    // drivers가 DriverResponse[] 타입인지 확인
    if (!data?.drivers) return [];

    let filtered = [...data.drivers] as DriverResponse[];

    // 검색 적용
    if (searchQuery) {
      filtered = filtered.filter(
        (driver: DriverResponse) =>
          driver.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.vehicleNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          driver.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // 정렬 적용
    filtered.sort((a: DriverResponse, b: DriverResponse) => {
      if (sortBy === "latest") {
        return b.driverId - a.driverId;
      }
      return a.driverName.localeCompare(b.driverName);
    });

    // 필터링된 결과를 Driver 타입으로 변환
    return filtered.map(convertToDriver);
  }, [data?.drivers, searchQuery, sortBy]);

  return {
    drivers: filteredAndSortedDrivers,
    isLoading,
    isError,
    totalCount: data?.count || 0,
    type: data?.driversType,
  };
};
