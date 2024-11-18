package ssafy.modo.jamkkaebi.domain.cargo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CargoDispatchRequestDto {

    @NotNull
    private long cargoId;
    @NotNull
    private long driverId;
}
