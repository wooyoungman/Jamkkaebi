package ssafy.modo.jamkkaebi.domain.driver.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.delivery.dto.response.DeliveryDetailResponseDto;
import ssafy.modo.jamkkaebi.domain.driver.service.DriverReadService;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.service.VehicleReadService;

@RestController
@RequestMapping("/api/v1/driver")
@RequiredArgsConstructor
public class DriverController {

    private final VehicleReadService vehicleReadService;
    private final DriverReadService driverReadService;

    @GetMapping(path = "/vehicle/info", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<VehicleInfo> getVehicleInfo() {
        return ApiResponse.success(vehicleReadService.getVehicleInfo());
    }

    @GetMapping(path = "/delivery/current", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DeliveryDetailResponseDto> getCurrentVehicleInfo() {
        return ApiResponse.success(driverReadService.getCurrentDeliveryInfo());
    }
}
