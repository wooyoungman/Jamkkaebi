package ssafy.modo.jamkkaebi.domain.manager.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.DriversResponseDto;
import ssafy.modo.jamkkaebi.domain.manager.dto.response.SimpleDriverInfo;
import ssafy.modo.jamkkaebi.domain.manager.entity.DriversType;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ManagerReadService {

    private final MemberRepository memberRepository;
    private final VehicleRepository vehicleRepository;
    private final SecurityUtil securityUtil;

    private static SimpleDriverInfo setDriverInfo(Member driver, Vehicle vehicle) {
        return SimpleDriverInfo.builder()
                .driverId(driver.getId())
                .driverName(driver.getName())
                .region(driver.getRegion())
                .profileImage(driver.getProfileImage())
                .phoneNumber(driver.getPhoneNumber())
                .status(driver.getStatus())
                .vehicleNumber((vehicle != null) ? vehicle.getVehicleNumber() : null)
                .build();
    }

    public DriversResponseDto getManagedDrivers() {

        List<SimpleDriverInfo> drivers = memberRepository.findManagedDriver(securityUtil.getCurrentUserId())
                .stream().map(driver -> {
                    Vehicle vehicle = vehicleRepository.findByDriverId(driver.getId()).orElse(null);
                    return setDriverInfo(driver, vehicle);
                }).toList();

        return DriversResponseDto.builder()
                .count(drivers.size())
                .driversType(DriversType.MANAGED)
                .drivers(drivers)
                .build();
    }

    public List<Member> getManagedDrivers(Long managerId) {
        return memberRepository.findManagedDriver(managerId);
    }

    public DriversResponseDto getUnmanagedDrivers() {

        List<SimpleDriverInfo> drivers = memberRepository.findUnmanagedDriver()
                .stream().map(driver -> {
                    Vehicle vehicle = vehicleRepository.findByDriverId(driver.getId()).orElse(null);
                    return setDriverInfo(driver, vehicle);
                }).toList();

        return DriversResponseDto.builder()
                .count(drivers.size())
                .driversType(DriversType.UNMANAGED)
                .drivers(drivers)
                .build();
    }
}
