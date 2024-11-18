package ssafy.modo.jamkkaebi.domain.manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.driver.dto.response.DriverInfo;
import ssafy.modo.jamkkaebi.domain.manager.dto.request.VehicleMapRequestDto;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.ManageConnectResponseDto;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.VehicleMapResponseDto;
import ssafy.modo.jamkkaebi.domain.manager.exception.DriverConflictException;
import ssafy.modo.jamkkaebi.domain.member.entity.ManagerAndDriver;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.exception.DriverNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.exception.ManagerNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.repository.ManagerDriverRepository;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;
import ssafy.modo.jamkkaebi.domain.member.service.MemberReadService;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.DriverHasVehicleException;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleHasDriverException;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.VehicleNotFoundException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class ManagerWriteService {

    private final ManagerDriverRepository managerDriverRepository;
    private final MemberRepository memberRepository;
    private final SecurityUtil securityUtil;
    private final MemberReadService memberReadService;
    private final VehicleRepository vehicleRepository;

    public ManageConnectResponseDto connectDriver(Integer driverId) {

        if (memberReadService.isDriverConnected(driverId)) {
            throw new DriverConflictException();
        } else {
            Member manager = memberRepository.findByUsername(securityUtil.getCurrentUsername())
                    .orElseThrow(ManagerNotFoundException::new);
            Member driver = memberRepository.findById((long) driverId)
                    .orElseThrow(DriverNotFoundException::new);

            managerDriverRepository.save(ManagerAndDriver.builder()
                    .manager(manager)
                    .driver(driver)
                    .build());

            return ManageConnectResponseDto.builder()
                    .totalDrivers(managerDriverRepository.countByManagerId(manager.getId()))
                    .connectedDriverId(driverId)
                    .build();
        }
    }

    public VehicleMapResponseDto mapVehicleToDriver(VehicleMapRequestDto dto) {

        Map<String, Member> managerAndDriver = memberReadService.findManagerAndDriver(
                securityUtil.getCurrentUserId(), dto.getDriverId());

        if (vehicleRepository.existsByDriverId(dto.getDriverId())) {
            throw new DriverHasVehicleException();
        } else if (!vehicleRepository.existsById(dto.getVehicleId())) {
            throw new VehicleNotFoundException();
        }

        Vehicle targetVehicle = vehicleRepository.findAvailableById(dto.getVehicleId())
                .orElseThrow(VehicleHasDriverException::new);

        Member driver = managerAndDriver.get("driver");

        targetVehicle.updateDriver(driver);
        Vehicle vehicle = vehicleRepository.save(targetVehicle);

        return VehicleMapResponseDto.builder()
                .driverInfo(DriverInfo.builder()
                        .driverId(driver.getId())
                        .driverName(driver.getName())
                        .build())
                .vehicleInfo(VehicleInfo.builder()
                        .vehicleId(vehicle.getId())
                        .vehicleNumber(vehicle.getVehicleNumber())
                        .build())
                .build();
    }
}
