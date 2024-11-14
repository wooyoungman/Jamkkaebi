package ssafy.modo.jamkkaebi.domain.vehicle.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleControlRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleControlResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleStatusResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.service.VehicleReadService;
import ssafy.modo.jamkkaebi.domain.vehicle.service.VehicleWriteService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vehicle")
public class VehicleController {

    private final VehicleWriteService vehicleWriteService;
    private final VehicleReadService vehicleReadService;

    @PostMapping(path = "/register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleCreateResponseDto> registerVehicle(@Valid @RequestBody VehicleCreateRequestDto dto) {
        return ApiResponse.success(vehicleWriteService.registerVehicle(dto));
    }

    @PatchMapping(path = "/control/command/{vehicleId}",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleControlResponseDto> controlCommand(
            @PathVariable Long vehicleId, @Valid @RequestBody VehicleControlRequestDto dto)
            throws JsonProcessingException {
        return ApiResponse.success(vehicleWriteService.controlByCommand(vehicleId, dto));
    }

    @PostMapping(path = "/control/wake/{vehicleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleControlResponseDto> wakeCommand(@PathVariable Long vehicleId)
            throws JsonProcessingException {
        return ApiResponse.success(vehicleWriteService.sendWakeCommand(vehicleId));
    }

    @PostMapping(path = "/control/awake/{vehicleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleControlResponseDto> awakeCommand(@PathVariable Long vehicleId)
            throws JsonProcessingException {
        return ApiResponse.success(vehicleWriteService.sendAWakeCommand(vehicleId));
    }

    @GetMapping(path = "/status/{vehicleId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleStatusResponseDto> getVehicleStatus(@PathVariable Long vehicleId) {
        return ApiResponse.success(vehicleReadService.getVehicleStatus(vehicleId));
    }
}