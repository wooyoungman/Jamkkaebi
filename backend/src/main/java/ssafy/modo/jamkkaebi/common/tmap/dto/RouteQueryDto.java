package ssafy.modo.jamkkaebi.common.tmap.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RouteQueryDto {

    private Float startX;
    private Float startY;
    private Float endX;
    private Float endY;
}
