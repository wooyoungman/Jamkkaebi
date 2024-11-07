package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DriversResponseDto {

    private int count;
    private List<SimpleDriverInfo> drivers;
}
