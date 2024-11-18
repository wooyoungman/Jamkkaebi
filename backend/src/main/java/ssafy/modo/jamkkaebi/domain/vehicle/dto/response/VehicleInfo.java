package ssafy.modo.jamkkaebi.domain.vehicle.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class VehicleInfo {

    private Long vehicleId;
    private String vehicleNumber;
}
