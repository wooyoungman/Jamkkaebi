import { useQueries } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";
import { queryKeys } from "@queries/index";
import {
  DriverWithRoute,
  DeliveryRecord,
  DriverList,
} from "@interfaces/manager";

export const useDriversWithRoutes = (driverList: DriverList | undefined) => {
  return useQueries({
    queries: (driverList?.drivers ?? []).map((driver) => ({
      queryKey: [...queryKeys.routes.list(), driver.driverId],
      queryFn: async () => { 
        const response = await axiosInstance.get<DeliveryRecord>(
          `/manager/driver/delivery?driver_id=${driver.driverId}`
        );

        // features가 없을 경우를 대비한 안전한 접근
        const features = response.data.route_info?.features;
        if (!features?.length) {
          throw new Error("No route information available");
        }

        // Point 타입의 feature만 필터링
        const coordinates = features
          .filter(feature => feature.geometry.type === "Point")
          .map(feature => ({
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          }));

        if (!coordinates.length) {
          throw new Error("No valid coordinates found in route information");
        }

        return {
          ...driver,
          location: coordinates[0], // 첫 번째 포인트를 현재 위치로 사용
          route: coordinates, // 모든 포인트를 경로로 사용
          deliveryInfo: response.data,
        } as DriverWithRoute;
      },
      enabled: !!driver.driverId && !!driverList,
      retry: 1,
    })),
  });
};