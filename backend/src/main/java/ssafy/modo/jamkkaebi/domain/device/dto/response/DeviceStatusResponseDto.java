package ssafy.modo.jamkkaebi.domain.device.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.device.entity.DeviceStatus;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceStatusResponseDto {

    private String uuid;
    private DeviceStatus status;
    private VehicleInfo vehicleInfo;
}
