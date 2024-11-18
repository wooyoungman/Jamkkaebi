package ssafy.modo.jamkkaebi.domain.device.dto.response;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.device.entity.DeviceStatus;

@Data
@Builder
public class DeviceInfoDto {

    private String uuid;
    private DeviceStatus status;
}
