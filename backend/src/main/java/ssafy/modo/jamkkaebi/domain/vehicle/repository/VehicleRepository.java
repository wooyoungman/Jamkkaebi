package ssafy.modo.jamkkaebi.domain.vehicle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Boolean existsByVehicleNumber(String vehicleNumber);
}
