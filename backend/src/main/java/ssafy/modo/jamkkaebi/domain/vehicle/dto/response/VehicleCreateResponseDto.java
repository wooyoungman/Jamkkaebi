package ssafy.modo.jamkkaebi.domain.vehicle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleCreateResponseDto {

    private Long vehicleId;
    private String vehicleNumber;
}
