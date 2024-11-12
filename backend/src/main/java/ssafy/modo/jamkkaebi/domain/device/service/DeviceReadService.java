package ssafy.modo.jamkkaebi.domain.device.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.exception.DeviceNotFoundException;
import ssafy.modo.jamkkaebi.domain.device.repository.DeviceRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeviceReadService {

    private final DeviceRepository deviceRepository;

    public DeviceInfoResponseDto getDeviceInfo(String uuid) {

        Device device = deviceRepository.findById(uuid)
                .orElseThrow(DeviceNotFoundException::new);

        VehicleInfo vehicleInfo = null;

        if (device.getVehicle() != null) {
            Vehicle vehicle = device.getVehicle();
            vehicleInfo = VehicleInfo.builder()
                    .vehicleId(vehicle.getId())
                    .vehicleNumber(vehicle.getVehicleNumber()).build();
        }

        return DeviceInfoResponseDto.builder()
                .uuid(device.getUuid())
                .vehicleInfo(vehicleInfo)
                .build();
    }
}
