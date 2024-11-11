package ssafy.modo.jamkkaebi.domain.vehicle.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleControlRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleControlResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.service.VehicleWriteService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/vehicle")
public class VehicleController {

    private final VehicleWriteService vehicleWriteService;

    @PostMapping(path = "/register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleCreateResponseDto> registerVehicle(@Valid @RequestBody VehicleCreateRequestDto dto) {
        return ApiResponse.success(vehicleWriteService.registerVehicle(dto));
    }

    @PatchMapping(path = "/control/command/{vehicleId}",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleControlResponseDto> controlCommand(
            @PathVariable Long vehicleId, @Valid @RequestBody VehicleControlRequestDto dto) {
        return ApiResponse.success(vehicleWriteService.controlByCommand(vehicleId, dto));
    }
}
