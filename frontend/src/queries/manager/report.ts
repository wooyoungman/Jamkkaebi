import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { ReportData } from "@interfaces/manager";

export const useReportData = (driverId: number) =>
  useQuery<ReportData>({
    queryKey: ["report", driverId],
    queryFn: () =>
      axiosInstance
        .get<ReportData>("/manager/report", {
          params: { driver_id: driverId },
        })
        .then((response) => response.data),
    enabled: !!driverId,
  });
