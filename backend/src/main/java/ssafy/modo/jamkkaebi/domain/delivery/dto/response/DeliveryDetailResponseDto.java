package ssafy.modo.jamkkaebi.domain.delivery.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.tmap.dto.response.GeoJsonDto;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDetailResponseDto {

    private Long deliveryId;
    private Long driverId;
    private String driverName;
    private String routeId;
    private Long cargoId;
    private String origin;
    private String destination;
    private Integer length;
    private LocalDateTime departureDate;
    private LocalDateTime arrivalDate;
    private Integer sleepSector;

    @JsonProperty("route_info")
    private GeoJsonDto routeInfo;
    @JsonProperty("route_sleep")
    private GeoJsonDto routeSleep;
}
