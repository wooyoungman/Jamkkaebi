package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.Builder;
import ssafy.modo.jamkkaebi.domain.driver.dto.response.DriverInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;

@Builder
public class VehicleMapResponseDto {

    private DriverInfo driverInfo;
    private VehicleInfo vehicleInfo;
}
