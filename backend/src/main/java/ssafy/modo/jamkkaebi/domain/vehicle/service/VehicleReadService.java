package ssafy.modo.jamkkaebi.domain.vehicle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.entity.DeviceStatus;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleStatusResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleNotFoundException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VehicleReadService {

    private final SecurityUtil securityUtil;
    private final VehicleRepository vehicleRepository;
    private final DeviceReadService deviceReadService;

    public VehicleInfo getVehicleInfo() {

        Vehicle vehicle = vehicleRepository.findByDriverId(securityUtil.getCurrentUserId())
                .orElseThrow(VehicleNotFoundException::new);

        return VehicleInfo.builder()
                .vehicleId(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .build();
    }

    public VehicleStatusResponseDto getVehicleStatus(Long vehicleId) {

        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElseThrow(VehicleNotFoundException::new);
        Device device = deviceReadService.getDevice(vehicle.getId());
        boolean isHealthy = deviceReadService.isDeviceHealthy(device);

        return VehicleStatusResponseDto.builder()
                .vehicleId(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .inUse(vehicle.getInUse())
                .deviceInfo(DeviceInfoDto.builder()
                        .uuid(device.getUuid())
                        .status((isHealthy) ? DeviceStatus.CONNECTED : DeviceStatus.DISCONNECTED)
                        .build())
                .build();
    }
}
