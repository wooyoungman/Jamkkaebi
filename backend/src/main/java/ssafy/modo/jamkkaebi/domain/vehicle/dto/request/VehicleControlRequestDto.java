package ssafy.modo.jamkkaebi.domain.vehicle.dto.request;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.ControlType;
import ssafy.modo.jamkkaebi.domain.vehicle.validation.ValidControlRequest;

@Data
@Builder
@ValidControlRequest
@NoArgsConstructor
@AllArgsConstructor
public class VehicleControlRequestDto {

    private ControlType target;
    @NotNull
    @Builder.Default
    private Integer control = 1;
    @Nullable
    @Min(0)
    @Max(255)
    @Builder.Default
    private Integer red = 0;
    @Nullable
    @Min(0)
    @Max(255)
    @Builder.Default
    private Integer green = 0;
    @Nullable
    @Min(0)
    @Max(255)
    @Builder.Default
    private Integer blue = 0;
    @Nullable
    @Min(0)
    @Max(100)
    @Builder.Default
    private Integer brightness = 0;
}
