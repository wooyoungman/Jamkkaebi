package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ManageConnectResponseDto {

    private int totalDrivers;
    private long connectedDriverId;
}
