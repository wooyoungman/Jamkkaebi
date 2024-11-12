package ssafy.modo.jamkkaebi.domain.device.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeviceConnectRequestDto {

    private String uuid;
    private Long vehicleId;
}
