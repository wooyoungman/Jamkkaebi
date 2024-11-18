package ssafy.modo.jamkkaebi.domain.device.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.device.dto.request.DeviceConnectRequestDto;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceStatusResponseDto;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceWriteService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/device")
public class DeviceController {

    private final DeviceReadService deviceReadService;
    private final DeviceWriteService deviceWriteService;
    private final ObjectMapper objectMapper;

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

    @PatchMapping(path = "/disconnect",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceInfoResponseDto> disconnectDevice(@Valid @RequestBody String request)
            throws JsonProcessingException {

        JSONObject requestBody = objectMapper.readValue(request, JSONObject.class);
        return ApiResponse.success(deviceWriteService.disconnectDevice((String) requestBody.get("uuid")));
    }

    @GetMapping(path = "/status", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeviceStatusResponseDto> getDeviceStatus(@Valid @RequestParam("device_id") String uuid) {
        return ApiResponse.success(deviceReadService.getDeviceStatus(uuid));
    }
}
