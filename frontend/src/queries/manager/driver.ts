import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import {
  DriverList,
  convertToDriver,
  ApiResponse,
  ApiDriverList,
} from "@interfaces/manager";
import { queryKeys } from "@queries/index";

export const useDriverList = (type: "unmanaged" | "managed") => {
  return useQuery<DriverList>({
    queryKey: [queryKeys.driver.list, type],
    queryFn: async () => {
      const res = await axiosInstance.get<ApiResponse<ApiDriverList>>(
        `/manager/drivers?type=${type}`
      );

      return {
        count: res.data.count,
        driversType: res.data.driversType,
        drivers: res.data.drivers.map(convertToDriver),
      };
    },
  });
};
