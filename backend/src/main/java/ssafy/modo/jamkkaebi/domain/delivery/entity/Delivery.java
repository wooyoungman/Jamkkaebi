package ssafy.modo.jamkkaebi.domain.delivery.entity;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;
import ssafy.modo.jamkkaebi.domain.delivery.dto.request.DeliveryCreateRequestDto;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Delivery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private Cargo cargo;

    @OneToOne
    private Vehicle vehicle;

    @NotNull
    private LocalDateTime departureDate;

    @Nullable
    private LocalDateTime arrivalDate;

    @NotNull
    private Boolean hasArrived;

    @NotNull
    private Integer lowFocusSector;

    @NotNull
    private Integer avgFocusIndex;

    @NotNull
    private Integer sleepSector;

    @NotNull
    private Integer aveSleepIndex;

    @Builder
    public Delivery(DeliveryCreateRequestDto dto) {
        this.cargo = dto.getCargo();
        this.vehicle = dto.getVehicle();
        this.departureDate = dto.getDepartureDate();
        this.arrivalDate = null;
        this.hasArrived = false;
        this.lowFocusSector = 0;
        this.avgFocusIndex = 0;
        this.sleepSector = 0;
        this.aveSleepIndex = 0;
    }
}
