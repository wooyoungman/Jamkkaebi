package ssafy.modo.jamkkaebi.domain.vehicle.dto.request;

import lombok.Data;
import ssafy.modo.jamkkaebi.domain.vehicle.validation.ValidVehiclePlate;

@Data
public class VehicleCreateRequestDto {

    @ValidVehiclePlate
    private String vehicleNumber;
}
