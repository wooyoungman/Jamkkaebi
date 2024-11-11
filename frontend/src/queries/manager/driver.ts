import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { DriverList } from "@interfaces/manager";
import { queryKeys } from "@queries/index";

export const useDriverList = (type: "unmanaged" | "managed") => {
  return useQuery<DriverList>({
    queryKey: [queryKeys.driver.list, type],
    queryFn: async () => {
      const res = await axiosInstance.get<DriverList>(
        `/manager/drivers?type=${type}`
      );
      return res.data;
    },
  });
};
