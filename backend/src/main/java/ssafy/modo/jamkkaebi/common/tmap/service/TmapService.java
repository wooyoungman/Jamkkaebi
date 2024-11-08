package ssafy.modo.jamkkaebi.common.tmap.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.MismatchedInputException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;
import ssafy.modo.jamkkaebi.common.tmap.dto.AddressQueryDto;
import ssafy.modo.jamkkaebi.common.tmap.dto.RouteQueryDto;
import ssafy.modo.jamkkaebi.common.tmap.exception.InvalidAddressException;
import ssafy.modo.jamkkaebi.common.tmap.exception.RouteSerializationException;
import ssafy.modo.jamkkaebi.common.util.RequestUtil;
import ssafy.modo.jamkkaebi.domain.route.dto.GeoJsonDto;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TmapService {

    private final RequestUtil requestUtil;
    private final ObjectMapper objectMapper;

    @Value("${tmap.base-url}")
    private String baseUrl;

    @Value("${tmap.app-key}")
    private String appKey;

    private static final Integer VERSION = 1;

    private Map<String, String> appendToHeader() {
        Map<String, String> header = new HashMap<>();
        header.put("appKey", appKey);
        return header;
    }

    private String buildUrlWithParams(String url, String address) {

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
        AddressQueryDto queryDto = new AddressQueryDto(address, VERSION, appKey);

        for (Field field : AddressQueryDto.class.getDeclaredFields()) {
            field.setAccessible(true);
            try {
                Object value = field.get(queryDto);
                if (value != null) {
                    builder.queryParam(field.getName(), value);
                }
            } catch (IllegalAccessException e) {
                throw new RuntimeException("Error accessing field: " + field.getName(), e);
            }
        }

        return builder.toUriString();
    }

    public Map<String, Double> getGeoCoordinate(String address) throws JsonProcessingException {

        Map<String, Double> geoCoordinate = new HashMap<>();

        String requestUrl = buildUrlWithParams(baseUrl + "/geo/fullAddrGeo", address);
        ResponseEntity<String> response = requestUtil.sendRequest(HttpMethod.GET, requestUrl, String.class, null);

        if (response.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
            throw new InvalidAddressException();
        }

        Gson gson = new GsonBuilder().create();
        JsonObject jsonBody = gson.fromJson(response.getBody(), JsonObject.class)
                .getAsJsonObject("coordinateInfo")
                .getAsJsonArray("coordinate")
                .get(0).getAsJsonObject();

        geoCoordinate.put("lat", jsonBody.getAsJsonPrimitive("newLat").getAsDouble());
        geoCoordinate.put("lon", jsonBody.getAsJsonPrimitive("newLon").getAsDouble());

        return geoCoordinate;
    }

    public GeoJsonDto getRoute(Map<String, Double> originCoordinate, Map<String, Double> destinationCoordinate)
            throws JsonProcessingException {

        String requestUrl = baseUrl + "/routes?version=" + VERSION;

        RouteQueryDto routeDto = RouteQueryDto.builder()
                .startX(originCoordinate.get("lon"))
                .startY(originCoordinate.get("lat"))
                .endX(destinationCoordinate.get("lon"))
                .endY(destinationCoordinate.get("lat"))
                .build();

        ResponseEntity<String> response = requestUtil.sendRequest(
                HttpMethod.POST, requestUrl, routeDto, String.class, appendToHeader());

        try {
            return objectMapper.readValue(response.getBody(), GeoJsonDto.class);
        } catch (MismatchedInputException e) {
            log.error("Error parsing geojson: {}", response.getBody(), e);
            throw new RouteSerializationException();
        }
    }
}
