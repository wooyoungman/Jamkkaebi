package ssafy.modo.jamkkaebi.domain.delivery.dto.request;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.time.LocalDateTime;

@Data
@Builder
public class DeliveryCreateRequestDto {

    private Cargo cargo;
    private Vehicle vehicle;
    private final LocalDateTime departureDate = LocalDateTime.now();
}
