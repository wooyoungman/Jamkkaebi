package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public class CargoInfo {

    private Long cargoId;
    private String cargo;
    private String routeId;
    private LocalDateTime dueDate;
}
