package ssafy.modo.jamkkaebi.domain.delivery.dto.request;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.time.LocalDateTime;

@Data
@Builder
public class DeliveryCreateRequestDto {

    private Cargo cargo;
    private Vehicle vehicle;
    @CreatedDate
    private LocalDateTime departureDate;
}
