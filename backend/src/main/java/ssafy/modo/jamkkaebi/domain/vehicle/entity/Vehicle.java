package ssafy.modo.jamkkaebi.domain.vehicle.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Vehicle extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String vehicleNumber;

    @NotNull
    private Integer lightIntensity;

    @NotNull
    private String lightColor;

    @NotNull
    private Integer volume;

    @NotNull
    private String fanSpeed;

    @NotNull
    private Integer temperature;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AlertType alertType;
}
