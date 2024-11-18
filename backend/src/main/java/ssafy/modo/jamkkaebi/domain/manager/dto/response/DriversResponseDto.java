package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.manager.entity.DriversType;

import java.util.List;

@Data
@Builder
public class DriversResponseDto {

    private int count;
    private DriversType driversType;
    private List<SimpleDriverInfo> drivers;
}
