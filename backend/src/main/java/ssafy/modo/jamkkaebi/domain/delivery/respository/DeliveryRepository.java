package ssafy.modo.jamkkaebi.domain.delivery.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    @Query("""
            SELECT CASE WHEN EXISTS
            (SELECT d FROM Delivery d WHERE d.cargo.id = :cargoId)
            THEN TRUE ELSE FALSE END
            """)
    Boolean isCargoDispatched(Long cargoId);
}
