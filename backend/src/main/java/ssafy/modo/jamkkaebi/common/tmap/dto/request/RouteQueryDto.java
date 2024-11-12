package ssafy.modo.jamkkaebi.common.tmap.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RouteQueryDto {

    private Double startX;
    private Double startY;
    private Double endX;
    private Double endY;
}
