package ssafy.modo.jamkkaebi.domain.device.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.device.dto.request.DeviceConnectRequestDto;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.exception.DeviceNotFoundException;
import ssafy.modo.jamkkaebi.domain.device.repository.DeviceRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleNotFoundException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class DeviceWriteService {

    private final DeviceRepository deviceRepository;
    private final VehicleRepository vehicleRepository;

    public DeviceInfoResponseDto createDevice() {
        Device device = deviceRepository.save(Device.builder().vehicle(null).build());
        return DeviceInfoResponseDto.builder()
                .uuid(device.getUuid())
                .build();
    }

    public DeviceInfoResponseDto connectDevice(DeviceConnectRequestDto dto) {

        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId()).orElseThrow(VehicleNotFoundException::new);
        Device device = deviceRepository.findById(dto.getUuid()).orElseThrow(DeviceNotFoundException::new);

        device.connectToVehicle(vehicle);
        Device updatedDevice = deviceRepository.save(device);

        return DeviceInfoResponseDto.builder()
                .uuid(updatedDevice.getUuid())
                .vehicleInfo(VehicleInfo.builder()
                        .vehicleId(updatedDevice.getVehicle().getId())
                        .vehicleNumber(updatedDevice.getVehicle().getVehicleNumber())
                        .build())
                .build();
    }

    public DeviceInfoResponseDto disconnectDevice(String uuid) {

        Device device = deviceRepository.findById(uuid).orElseThrow(DeviceNotFoundException::new);

        device.disconnectFromVehicle();
        Device updatedDevice = deviceRepository.save(device);

        return DeviceInfoResponseDto.builder()
                .uuid(updatedDevice.getUuid())
                .vehicleInfo(null)
                .build();
    }
}
