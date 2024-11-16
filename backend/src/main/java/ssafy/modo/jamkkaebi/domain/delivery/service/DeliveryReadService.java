package ssafy.modo.jamkkaebi.domain.delivery.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.delivery.respository.DeliveryRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeliveryReadService {

    private final DeliveryRepository deliveryRepository;

    public boolean isCargoDispatched(Long cargoId) {
        return deliveryRepository.isCargoDispatched(cargoId);
    }
}
