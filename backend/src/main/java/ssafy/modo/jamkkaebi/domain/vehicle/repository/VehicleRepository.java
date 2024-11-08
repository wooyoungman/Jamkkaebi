package ssafy.modo.jamkkaebi.domain.vehicle.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    Boolean existsByVehicleNumber(String vehicleNumber);

    @Query("""
            SELECT v FROM Vehicle v
            WHERE v.driver.id = :driverId
            """)
    Optional<Vehicle> findByDriverId(Long driverId);
}
