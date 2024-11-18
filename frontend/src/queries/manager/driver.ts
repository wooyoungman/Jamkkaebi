import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "@queries/index";

export const useDriverList = (type: "unmanaged" | "managed") => {
  return useQuery({
    queryKey: [...queryKeys.driver.list(), type],
    queryFn: async () => {
      const response = await axiosInstance.get(`/manager/drivers?type=${type}`);
      return response.data; // 이미 DriverList 타입
    },
  });
};
