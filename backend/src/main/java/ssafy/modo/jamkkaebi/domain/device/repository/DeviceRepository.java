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
}
