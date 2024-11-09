package ssafy.modo.jamkkaebi.domain.manager.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleMapRequestDto {

    private Long driverId;
    private Long vehicleId;
}
