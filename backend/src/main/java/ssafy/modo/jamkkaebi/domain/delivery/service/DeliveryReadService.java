package ssafy.modo.jamkkaebi.domain.delivery.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.tmap.exception.RouteSerializationException;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.delivery.dto.response.DeliveryDetailResponseDto;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.delivery.respository.DeliveryRepository;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.route.entity.Route;
import ssafy.modo.jamkkaebi.domain.route.repository.RouteRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeliveryReadService {

    private final DeliveryRepository deliveryRepository;
    private final RouteRepository routeRepository;

    public boolean isCargoDispatched(Long cargoId) {
        return deliveryRepository.isCargoDispatched(cargoId);
    }

    public DeliveryDetailResponseDto getDeliveryDetail(Delivery delivery) {

        Member driver = delivery.getVehicle().getDriver();
        Cargo cargo = delivery.getCargo();
        Route route = routeRepository.findById(delivery.getCargo().getRouteId())
                .orElseThrow(RouteSerializationException::new);

        return DeliveryDetailResponseDto.builder()
                .deliveryId(delivery.getId())
                .driverId(driver.getId())
                .driverName(driver.getName())
                .routeId(route.getId())
                .cargoId(cargo.getId())
                .origin(cargo.getOrigin())
                .destination(cargo.getDestination())
                .length(route.getRouteInfo().getFeatures().get(0).getProperties().getTotalDistance())
                .departureDate(delivery.getDepartureDate())
                .arrivalDate(delivery.getArrivalDate())
                .sleepSector(delivery.getSleepSector())
                .routeInfo(route.getRouteInfo())
                .build();
    }
}
