package ssafy.modo.jamkkaebi.domain.device.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.device.dto.request.DeviceConnectRequestDto;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceWriteService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/device")
public class DeviceController {

    private final DeviceReadService deviceReadService;
    private final DeviceWriteService deviceWriteService;

    @GetMapping(path = "/vehicle", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceInfoResponseDto> getDeviceInfo(@Valid @RequestParam("device_id") String uuid) {
        return ApiResponse.success(deviceReadService.getDeviceInfo(uuid));
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceInfoResponseDto> createDevice() {
        return ApiResponse.success(deviceWriteService.createDevice());
    }

    @PatchMapping(path = "/connect",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceInfoResponseDto> connectDevice(@Valid @RequestBody DeviceConnectRequestDto dto) {
        return ApiResponse.success(deviceWriteService.connectDevice(dto));
    }
}
