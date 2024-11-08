package ssafy.modo.jamkkaebi.domain.manager.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.DriversResponseDto;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.ManageConnectResponseDto;
import ssafy.modo.jamkkaebi.domain.manager.entity.DriversType;
import ssafy.modo.jamkkaebi.domain.manager.service.ManagerReadService;
import ssafy.modo.jamkkaebi.domain.manager.service.ManagerWriteService;

@RestController
@RequestMapping("/api/v1/manager")
@RequiredArgsConstructor
public class ManagerController {

    private final ManagerWriteService managerWriteService;
    private final ManagerReadService managerReadService;

    @GetMapping(path = "/drivers", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<DriversResponseDto> getDrivers(@RequestParam String type) {

        DriversResponseDto responseDto;

        if (type.toUpperCase().equals(DriversType.MANAGED.toString())) {
            responseDto = managerReadService.getManagedDrivers();
        } else if (type.toUpperCase().equals(DriversType.UNMANAGED.toString())) {
            responseDto = managerReadService.getUnmanagedDrivers();
        } else {
            throw new IllegalArgumentException("Invalid driver type: " + type);
        }

        return ApiResponse.success(responseDto);
    }

    @PostMapping(path = "/driver/connect/{driver_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<ManageConnectResponseDto> connectDriver(@PathVariable("driver_id") Integer driverId) {
        return ApiResponse.success(managerWriteService.connectDriver(driverId));
    }
}
