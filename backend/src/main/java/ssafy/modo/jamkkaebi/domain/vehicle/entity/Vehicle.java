package ssafy.modo.jamkkaebi.domain.vehicle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleCreateRequestDto;

import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Vehicle extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "vehicle")
    private List<Delivery> delivery;

    @OneToOne
    private Member driver;

    @NotNull
    private String vehicleNumber;

    @NotNull
    private Boolean inUse;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AlertType alertType;

    @Builder
    public Vehicle(VehicleCreateRequestDto requestDto) {
        this.vehicleNumber = requestDto.getVehicleNumber();
        this.inUse = false;
        this.alertType = AlertType.DISABLED;
    }

    public void updateDriver(Member driver) {
        this.driver = driver;
    }
}
