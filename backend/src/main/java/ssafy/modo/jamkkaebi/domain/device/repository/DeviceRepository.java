package ssafy.modo.jamkkaebi.domain.device.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;

import java.util.Optional;

public interface DeviceRepository extends JpaRepository<Device, String> {

    @Query("""
            SELECT d FROM Device d WHERE d.vehicle.id = :vehicleId
            """)
    Optional<Device> findByVehicleId(Long vehicleId);

    @Query("""
            SELECT d FROM Device d
            JOIN Vehicle v ON v.driver.id = :driverId
            WHERE d.vehicle = v
            """)
    Optional<Device> findByDriverId(Long driverId);
}
