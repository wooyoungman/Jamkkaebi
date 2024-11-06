package ssafy.modo.jamkkaebi.domain.cargo.dto.response;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.route.dto.GeoJsonDto;

import java.util.Map;

@Data
@Builder
public class CargoCreateResponseDto {

    private String origin;
    private String destination;
    private Map<String, Float> originCoordinate;
    private Map<String, Float> destinationCoordinate;
    private GeoJsonDto route;
}
