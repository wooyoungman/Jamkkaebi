package ssafy.modo.jamkkaebi.domain.device.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.repository.DeviceRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class DeviceWriteService {

    private final DeviceRepository deviceRepository;

    public DeviceInfoResponseDto createDevice() {
        Device device = deviceRepository.save(Device.builder().vehicle(null).build());
        return DeviceInfoResponseDto.builder()
                .uuid(device.getUuid())
                .build();
    }
}
