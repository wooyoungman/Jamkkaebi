package ssafy.modo.jamkkaebi.domain.vehicle.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceInfoDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehicleStatusResponseDto {

    private Long vehicleId;
    private String vehicleNumber;
    private Boolean inUse;
    private DeviceInfoDto deviceInfo;
}
