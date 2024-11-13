import { atom, useAtomValue } from "jotai";
import { useMemo } from "react";
import { useDriverList } from "@queries/index";
import { Driver, convertToDriver } from "@interfaces/manager";

export const searchQueryAtom = atom("");
export const sortByAtom = atom<"latest" | "name">("latest");
export const driverTypeAtom = atom<"managed" | "unmanaged">("unmanaged");

export const useDriverListWithFilters = () => {
  const searchQuery = useAtomValue(searchQueryAtom);
  const sortBy = useAtomValue(sortByAtom);
  const driverType = useAtomValue(driverTypeAtom);

  const { data, isLoading, isError } = useDriverList(driverType);

  const filteredAndSortedDrivers = useMemo(() => {
    if (!data?.drivers) return [];

    let filtered = data.drivers.map(convertToDriver);

    if (searchQuery) {
      filtered = filtered.filter(
        (driver: Driver) =>
          driver.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          driver.vehicleNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          driver.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a: Driver, b: Driver) => {
      if (sortBy === "latest") {
        return b.memberId - a.memberId;
      }
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
