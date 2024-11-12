package ssafy.modo.jamkkaebi.domain.route.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectorGeoJsonDto {

    private String type = "FeatureCollection";
    private List<Feature> features;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Feature {

        private String type = "Feature";
        private Geometry geometry;
        private Properties properties;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Geometry {

        private String type = "LineString";
        private List<List<Double>> coordinates;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Properties {

        private Integer totalDistance;
        private Integer index;
        private Integer lineIndex;
        private Integer distance;
    }
}
