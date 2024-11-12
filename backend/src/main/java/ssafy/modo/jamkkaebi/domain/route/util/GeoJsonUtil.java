package ssafy.modo.jamkkaebi.domain.route.util;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ssafy.modo.jamkkaebi.domain.route.dto.response.SectorGeoJsonDto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class GeoJsonUtil {

    private static final int EARTH_RADIUS_KM = 6371;

    public SectorGeoJsonDto buildGeoJson(Map<Integer, List<List<Double>>> sectorMap) {

        SectorGeoJsonDto sectorGeoJsonDto = new SectorGeoJsonDto();
        List<SectorGeoJsonDto.Feature> features = new ArrayList<>();

        int lineIndex = 0, totalDistance = 0;
        for (Map.Entry<Integer, List<List<Double>>> entry : sectorMap.entrySet()) {
            Integer index = entry.getKey();
            List<List<Double>> coordinates = entry.getValue();

            SectorGeoJsonDto.Geometry geometry = new SectorGeoJsonDto.Geometry();
            geometry.setCoordinates(coordinates);

            SectorGeoJsonDto.Properties properties = new SectorGeoJsonDto.Properties();
            properties.setIndex(index);
            properties.setLineIndex(lineIndex);

            int sectorDistance = calculateDistance(coordinates);
            properties.setDistance(sectorDistance);
            totalDistance += sectorDistance;

            SectorGeoJsonDto.Feature feature = new SectorGeoJsonDto.Feature();
            feature.setGeometry(geometry);
            feature.setProperties(properties);

            features.add(feature);
            lineIndex++;
        }

        sectorGeoJsonDto.setFeatures(features);
        sectorGeoJsonDto.getFeatures().get(0).getProperties().setDistance(totalDistance);

        return sectorGeoJsonDto;
    }

    private int calculateDistance(List<List<Double>> coordinates) {

        int routeDist = 0;
        for (int i = 0; i < coordinates.size() - 1; i++) {
            routeDist += distanceBetweenCoordinates(coordinates.get(i), coordinates.get(i + 1));
        }
        return routeDist;
    }

    private static int distanceBetweenCoordinates(List<Double> coord1, List<Double> coord2) {

        double lat1 = Math.toRadians(coord1.get(1));
        double lon1 = Math.toRadians(coord1.get(0));
        double lat2 = Math.toRadians(coord2.get(1));
        double lon2 = Math.toRadians(coord2.get(0));

        double deltaLat = lat2 - lat1;
        double deltaLon = lon2 - lon1;

        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)
                + Math.cos(lat1) * Math.cos(lat2)
                * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (int) (EARTH_RADIUS_KM * c * 1000);
    }
}
