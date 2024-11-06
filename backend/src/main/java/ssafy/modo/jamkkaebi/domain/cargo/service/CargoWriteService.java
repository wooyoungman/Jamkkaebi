package ssafy.modo.jamkkaebi.domain.cargo.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.modo.jamkkaebi.common.tmap.service.TmapService;
import ssafy.modo.jamkkaebi.domain.cargo.dto.request.CargoCreateDto;
import ssafy.modo.jamkkaebi.domain.cargo.dto.response.CargoCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.cargo.repository.CargoRepository;
import ssafy.modo.jamkkaebi.domain.route.dto.GeoJsonDto;
import ssafy.modo.jamkkaebi.domain.route.entity.Route;
import ssafy.modo.jamkkaebi.domain.route.repository.RouteRepository;

import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CargoWriteService {

    private final TmapService tmapService;
    private final CargoRepository cargoRepository;
    private final RouteRepository routeRepository;

    public CargoCreateResponseDto createCargo(CargoCreateDto dto) throws JsonProcessingException {

        String origin = dto.getOrigin();
        String destination = dto.getDestination();

        Map<String, Double> originCoordinate = tmapService.getGeoCoordinate(origin);
        Map<String, Double> destinationCoordinate = tmapService.getGeoCoordinate(destination);

        GeoJsonDto cargoRoute = tmapService.getRoute(originCoordinate, destinationCoordinate);
        Cargo cargo = saveCargo(dto, cargoRoute, originCoordinate, destinationCoordinate);

        return CargoCreateResponseDto.builder()
                .cargoId(cargo.getId())
                .routeId(cargo.getRouteId())
                .cargo(cargo.getCargoInfo())
                .origin(cargo.getOrigin())
                .destination(cargo.getDestination())
                .distance(cargo.getDistance())
                .build();
    }

    private Route saveRoute(Cargo cargo, GeoJsonDto cargoRoute) {
        return routeRepository.insert(Route.builder()
                .cargoId(cargo.getId())
                .routeInfo(cargoRoute)
                .build());
    }

    private Cargo saveCargo(CargoCreateDto cargoDto, GeoJsonDto geoDto,
                            Map<String, Double> originCoordinate, Map<String, Double> destinationCoordinate) {

        int distance = geoDto.getFeatures().get(0).getProperties().getTotalDistance();

        Cargo cargo = cargoRepository.save(Cargo.builder()
                .cargoInfo(cargoDto.getCargo())
                .origin(cargoDto.getOrigin())
                .originLat(originCoordinate.get("lat").toString())
                .originLon(originCoordinate.get("lon").toString())
                .destination(cargoDto.getDestination())
                .destinationLat(destinationCoordinate.get("lat").toString())
                .destinationLon(destinationCoordinate.get("lon").toString())
                .dueDate(cargoDto.getDueDate())
                .distance(distance)
                .build());

        Route route = saveRoute(cargo, geoDto);
        cargo.updateRouteId(route.getId());
        cargoRepository.save(cargo);

        return cargo;
    }
}
