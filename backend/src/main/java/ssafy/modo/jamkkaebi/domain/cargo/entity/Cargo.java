package ssafy.modo.jamkkaebi.domain.cargo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cargo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String cargoInfo;

    @NotNull
    private String origin;

    @NotNull
    private String originLat;

    @NotNull
    private String originLon;

    @NotNull
    private String destination;

    @NotNull
    private String destinationLat;

    @NotNull
    private String destinationLon;

    @NotNull
    private LocalDateTime dueDate;

    @NotNull
    private Integer distance;

    private String routeId;

    @Builder
    public Cargo(String cargoInfo, String origin, String destination, LocalDateTime dueDate, Integer distance,
                 String originLat, String originLon, String destinationLat, String destinationLon) {
        this.cargoInfo = cargoInfo;
        this.origin = origin;
        this.originLat = originLat;
        this.originLon = originLon;
        this.destination = destination;
        this.destinationLat = destinationLat;
        this.destinationLon = destinationLon;
        this.dueDate = dueDate;
        this.distance = distance;
    }

    public void updateRouteId(String routeId) {
        this.routeId = routeId;
    }
}
