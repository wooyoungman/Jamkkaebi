package ssafy.modo.jamkkaebi.domain.driver.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DriverInfo {

    private Long driverId;
    private String driverName;
}
