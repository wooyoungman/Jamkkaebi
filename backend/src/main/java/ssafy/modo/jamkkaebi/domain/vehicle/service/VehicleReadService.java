package ssafy.modo.jamkkaebi.domain.vehicle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleNotFoundException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VehicleReadService {

    private final VehicleRepository vehicleRepository;
    private final SecurityUtil securityUtil;

    public VehicleInfo getVehicleInfo() {

        Vehicle vehicle = vehicleRepository.findByDriverId(securityUtil.getCurrentUserId())
                .orElseThrow(VehicleNotFoundException::new);

        return VehicleInfo.builder()
                .vehicleId(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .build();
    }
}
