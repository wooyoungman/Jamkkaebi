package ssafy.modo.jamkkaebi.domain.vehicle.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.rabbitmq.service.RabbitSendService;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.exception.DeviceNotFoundException;
import ssafy.modo.jamkkaebi.domain.device.repository.DeviceRepository;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.RabbitControlRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleControlRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleControlResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.DuplicatedVehicleException;
import ssafy.modo.jamkkaebi.domain.vehicle.exception.UnauthorizedControlException;
import ssafy.modo.jamkkaebi.domain.vehicle.repository.VehicleRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class VehicleWriteService {

    private final VehicleRepository vehicleRepository;
    private final SecurityUtil securityUtil;
    private final MemberRepository memberRepository;
    private final DeviceRepository deviceRepository;
    private final RabbitSendService rabbitSendService;

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

    public VehicleControlResponseDto controlByCommand(Long vehicleId, VehicleControlRequestDto dto)
            throws JsonProcessingException {

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
        // TODO: 매니저일 경우 조작 기록 저장
        return sendCommand(getDevice(vehicleId), dto);
    }

    private Device getDevice(Long vehicleId) {
        return deviceRepository.findByVehicleId(vehicleId).orElseThrow(DeviceNotFoundException::new);
    }

    private RabbitControlRequestDto rabbitRequestBuilder(VehicleControlRequestDto dto, Boolean abnormal) {
        return RabbitControlRequestDto.builder()
                .dto(dto)
                .abnormal(abnormal)
                .build();
    }

    private VehicleControlResponseDto sendCommand(Device device, VehicleControlRequestDto vehicleDto)
            throws JsonProcessingException {

        // TODO: FastAPI 졸음 판단 결과에 따라 abnormal 값 변화시키기
        RabbitControlRequestDto requestDto = rabbitRequestBuilder(vehicleDto, Boolean.FALSE);
        rabbitSendService.sendCommandToDevice(device.getUuid(), requestDto);

        return VehicleControlResponseDto.builder()
                .target(vehicleDto.getTarget())
                .control(vehicleDto.getControl())
                .red(vehicleDto.getRed())
                .green(vehicleDto.getGreen())
                .blue(vehicleDto.getBlue())
                .brightness(vehicleDto.getBrightness())
                .deviceInfo(DeviceInfoResponseDto.builder()
                        .uuid(device.getUuid())
                        .vehicleInfo(VehicleInfo.builder()
                                .vehicleId(device.getVehicle().getId())
                                .vehicleNumber(device.getVehicle().getVehicleNumber())
                                .build())
                        .build())
                .build();
    }
}
