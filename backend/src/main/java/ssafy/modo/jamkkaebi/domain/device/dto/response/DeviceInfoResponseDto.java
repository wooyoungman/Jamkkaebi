package ssafy.modo.jamkkaebi.domain.device.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.response.VehicleInfo;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DeviceInfoResponseDto {

    private String uuid;
    private VehicleInfo vehicleInfo;
}
