package ssafy.modo.jamkkaebi.domain.manager.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleMapRequestDto {

    @NotNull
    private Long driverId;
    @NotNull
    private Long vehicleId;
}
