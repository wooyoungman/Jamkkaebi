package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.driver.dto.response.DriverInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;

@Data
@Builder
public class CargoDispatchResponseDto {

    private Long deliveryId;
    private VehicleInfo vehicleInfo;
    private DriverInfo driverInfo;
    private CargoInfo cargoInfo;
}
