package ssafy.modo.jamkkaebi.domain.vehicle.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleControlRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleControlResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.DuplicatedVehicleException;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.UnauthorizedControlException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class VehicleWriteService {

    private final VehicleRepository vehicleRepository;
    private final SecurityUtil securityUtil;
    private final MemberRepository memberRepository;

    public VehicleCreateResponseDto registerVehicle(VehicleCreateRequestDto dto) {

        if (Boolean.TRUE.equals(vehicleRepository.existsByVehicleNumber(dto.getVehicleNumber()))) {
            throw new DuplicatedVehicleException();
        }

        Vehicle vehicle = vehicleRepository.save(Vehicle.builder().requestDto(dto).build());

        return VehicleCreateResponseDto.builder()
                .vehicleId(vehicle.getId())
                .vehicleNumber(vehicle.getVehicleNumber())
                .build();

    }

    public VehicleControlResponseDto controlByCommand(Long vehicleId, VehicleControlRequestDto dto) {

        Member member = memberRepository.findById(securityUtil.getCurrentUserId())
                .orElseThrow(UserNotFoundException::new);

        if (member.getRole().equals(MemberRole.MANAGER)) {
            if (!vehicleRepository.isVehicleMappedToDriverOfManager(vehicleId, member.getId())) {
                throw new UnauthorizedControlException();
            }
        } else if (member.getRole().equals(MemberRole.DRIVER)) {
            if (!vehicleRepository.existsByDriverId(member.getId())) {
                throw new UnauthorizedControlException();
            }
        }

        // TODO: 차량의 연결 상태 확인
        // TODO: 조작 응답 확인
        // TODO: 매니저일 경우 조작 기록 저장

        return VehicleControlResponseDto.builder()
                .target(dto.getTarget())
                .control(dto.getControl())
                .red(dto.getRed())
                .green(dto.getGreen())
                .blue(dto.getBlue())
                .brightness(dto.getBrightness())
                .build();
    }

    private boolean sendCommand(VehicleControlRequestDto dto) {
        return true;
    }
}
