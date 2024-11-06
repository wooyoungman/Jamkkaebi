package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CargoCreateResponseDto {

    private long cargoId;
    private String routeId;
    private String cargo;
    private String origin;
    private String destination;
    private int distance;
}
