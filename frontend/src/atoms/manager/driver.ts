import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { useDriverList } from "@queries/index";
import { Driver, convertToDriver } from "@interfaces/manager";

export const searchQueryAtom = atom("");
export const sortByAtom = atom<"latest" | "name">("latest");
export const driverTypeAtom = atom<"managed" | "unmanaged">("managed");

export const useDriverListWithFilters = () => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const sortBy = useAtomValue(sortByAtom);
  const driverType = useAtomValue(driverTypeAtom);

  const { data, isLoading, isError } = useDriverList(driverType);

  const filteredAndSortedDrivers = useMemo(() => {
    if (!data?.drivers) return [];

    let filtered = data.drivers.map(convertToDriver);

    if (searchQuery) {
      filtered = filtered.filter((driver: Driver) => {
        const searchLower = searchQuery.toLowerCase();

        // null 체크를 추가하고 optional chaining 사용
        const nameMatch =
          driver.memberName?.toLowerCase().includes(searchLower) || false;
        const vehicleMatch =
          driver.vehicleNumber?.toLowerCase().includes(searchLower) || false;
        const addressMatch =
          driver.region?.toLowerCase().includes(searchLower) || false;

        return nameMatch || vehicleMatch || addressMatch;
      });
    }

    filtered.sort((a: Driver, b: Driver) => {
      if (sortBy === "latest") {
        return b.memberId - a.memberId;
      }
      // memberName이 null일 수 있으므로 체크 추가
      if (!a.memberName || !b.memberName) return 0;
      return a.memberName.localeCompare(b.memberName);
    });

    return filtered;
  }, [data?.drivers, searchQuery, sortBy]);

  return {
    drivers: filteredAndSortedDrivers,
    isLoading,
    isError,
    totalCount: data?.count || 0,
    type: data?.driversType,
  };
};
