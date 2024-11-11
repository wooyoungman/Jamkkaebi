package ssafy.modo.jamkkaebi.domain.vehicle.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.ControlType;
import ssafy.modo.jamkkaebi.domain.vehicle.validation.ValidControlRequest;

@Data
@ValidControlRequest
@NoArgsConstructor
public class VehicleControlRequestDto {

    private ControlType target;
    @NotNull
    private Integer control;
    @Nullable @Min(0) @Max(255)
    private Integer red;
    @Nullable @Min(0) @Max(255)
    private Integer green;
    @Nullable @Min(0) @Max(255)
    private Integer blue;
    @Nullable @Min(0) @Max(100)
    private Integer brightness;
}
