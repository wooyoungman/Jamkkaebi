package ssafy.modo.jamkkaebi.domain.device.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

@Entity
@Getter
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

    public void disconnectFromVehicle(Vehicle vehicle) {
        this.vehicle = null;
    }
}
