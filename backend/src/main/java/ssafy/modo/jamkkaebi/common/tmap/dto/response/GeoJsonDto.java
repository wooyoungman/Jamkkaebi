package ssafy.modo.jamkkaebi.common.tmap.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeoJsonDto {

    private String type;
    private List<Feature> features;

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Feature {

        private String type;
        private Geometry geometry;
        private Properties properties;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public static class Geometry {

        private String type;
        private Object coordinates;
    }

    @Data
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Properties {

        private Integer totalDistance;
        private Integer index;
        private Integer pointIndex;
        private String pointType;

        private Integer lineIndex;
        private Integer distance;
    }
}
