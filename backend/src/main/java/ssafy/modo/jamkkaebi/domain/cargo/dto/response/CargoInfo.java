package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class CargoInfo {

    private Long cargoId;
    private String cargo;
    private String routeId;
    private LocalDateTime dueDate;
}
