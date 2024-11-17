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
          `/manager/delivery/detail?delivery_id=&driver_id=${driver.driverId}`
        );

        return {
          ...driver,
          location: {
            lat: response.data.route_info.features[0].geometry.coordinates[1],
            lng: response.data.route_info.features[0].geometry.coordinates[0],
          },
          route: response.data.route_info.features.map((feature) => ({
            lat: feature.geometry.coordinates[1],
            lng: feature.geometry.coordinates[0],
          })),
          deliveryInfo: response.data,
        } as DriverWithRoute;
      },
      enabled: !!driver.driverId && !!driverList,
    })),
  });
};
