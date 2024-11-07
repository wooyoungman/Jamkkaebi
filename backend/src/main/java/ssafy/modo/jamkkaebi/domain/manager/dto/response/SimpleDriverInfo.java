package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SimpleDriverInfo {

    private long driverId;
    private String driverName;
    private String phoneNumber;
    private String address;
}
