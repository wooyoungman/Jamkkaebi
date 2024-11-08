package ssafy.modo.jamkkaebi.domain.vehicle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.DuplicatedVehicleException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class VehicleWriteService {

    private final VehicleRepository vehicleRepository;

    public VehicleCreateResponseDto registerVehicle(VehicleCreateRequestDto dto) {

        if (vehicleRepository.existsByVehicleNumber(dto.getVehicleNumber())) {
            throw new DuplicatedVehicleException();
        }

        Vehicle vehicle = vehicleRepository.save(Vehicle.builder().requestDto(dto).build());

        return VehicleCreateResponseDto.builder()
                .vehicleId(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .build();

    }
}
