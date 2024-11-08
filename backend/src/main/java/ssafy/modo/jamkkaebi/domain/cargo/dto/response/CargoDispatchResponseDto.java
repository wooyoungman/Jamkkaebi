package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
public class CargoDispatchResponseDto {

    private Long deliveryId;

    private VehicleInfo vehicleInfo;
    private DriverInfo driverInfo;
    private CargoInfo cargoInfo;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VehicleInfo {
        private Long vehicleId;
        private String vehicleNumber;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DriverInfo {
        private Long driverId;
        private String driverName;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CargoInfo {
        private Long cargoId;
        private String cargo;
        private String routeId;
        private LocalDateTime dueDate;
    }
}
