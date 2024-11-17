package ssafy.modo.jamkkaebi.domain.driver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.delivery.dto.response.DeliveryDetailResponseDto;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.delivery.respository.DeliveryRepository;
import ssafy.modo.jamkkaebi.domain.delivery.service.DeliveryReadService;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleNotFoundException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DriverReadService {

    private final SecurityUtil securityUtil;
    private final DeliveryReadService deliveryReadService;
    private final VehicleRepository vehicleRepository;
    private final DeliveryRepository deliveryRepository;

    public DeliveryDetailResponseDto getCurrentDeliveryInfo() {

        Long driverId = securityUtil.getCurrentUserId();
        Vehicle vehicle = vehicleRepository.findByDriverId(driverId).orElseThrow(VehicleNotFoundException::new);
        Delivery delivery = deliveryRepository.findFirstByVehicleAndHasArrivedIsFalse(vehicle);
        return deliveryReadService.getDeliveryDetail(delivery);
    }
}
