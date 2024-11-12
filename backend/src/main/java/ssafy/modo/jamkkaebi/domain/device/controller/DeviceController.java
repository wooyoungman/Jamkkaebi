package ssafy.modo.jamkkaebi.domain.device.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/device")
public class DeviceController {

    private final DeviceReadService deviceReadService;

    @GetMapping(path = "/vehicle", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceInfoResponseDto> getDeviceInfo(@Valid @RequestParam("device_id") String uuid) {
        return ApiResponse.success(deviceReadService.getDeviceInfo(uuid));
    }
}
