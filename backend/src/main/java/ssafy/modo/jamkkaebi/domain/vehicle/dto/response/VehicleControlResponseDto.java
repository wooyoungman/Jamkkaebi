package ssafy.modo.jamkkaebi.domain.vehicle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.ControlType;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleControlResponseDto {

    private ControlType target;
    private Integer control;
    private Integer red;
    private Integer green;
    private Integer blue;
    private Integer brightness;
}
