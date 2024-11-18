package ssafy.modo.jamkkaebi.domain.delivery.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.delivery.dto.request.DeliveryCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.delivery.respository.DeliveryRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

@Service
@Transactional
@RequiredArgsConstructor
public class DeliveryWriteService {

    private final DeliveryRepository deliveryRepository;

    public Delivery createDelivery(Vehicle vehicle, Cargo cargo) {

        return deliveryRepository.save(Delivery.builder()
                .dto(DeliveryCreateRequestDto.builder()
                        .vehicle(vehicle)
                        .cargo(cargo)
                        .build())
                .build());
    }
}
