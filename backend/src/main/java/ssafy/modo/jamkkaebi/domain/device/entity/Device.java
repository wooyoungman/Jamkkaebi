package ssafy.modo.jamkkaebi.domain.device.entity;

import jakarta.persistence.*;
import lombok.*;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Device extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String uuid;

    @OneToOne
    private Vehicle vehicle;

    public void connectToVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

    public void disconnectFromVehicle() {
        this.vehicle = null;
    }
}
