package ssafy.modo.jamkkaebi.domain.delivery.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.Vehicle;

import java.time.LocalDateTime;
import java.util.List;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    @Query("""
            SELECT CASE WHEN EXISTS
            (SELECT d FROM Delivery d WHERE d.cargo.id = :cargoId)
            THEN TRUE ELSE FALSE END
            """)
    Boolean isCargoDispatched(Long cargoId);

    Delivery findFirstByVehicleAndHasArrivedIsFalse(Vehicle vehicle);

    @Query("""
            SELECT dl FROM Delivery dl
            JOIN Device d ON dl.vehicle = d.vehicle
            WHERE d.uuid = :uuid AND dl.hasArrived IS FALSE
            """)
    Delivery findByDeviceUuidAndHasArrivedIsFalse(String uuid);

    List<Delivery> findAllByVehicleAndDepartureDateBetween(Vehicle vehicle, LocalDateTime from, LocalDateTime to);
}
