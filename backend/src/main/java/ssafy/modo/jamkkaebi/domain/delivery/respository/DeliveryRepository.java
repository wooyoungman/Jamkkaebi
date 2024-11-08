package ssafy.modo.jamkkaebi.domain.delivery.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.modo.jamkkaebi.domain.delivery.entity.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}
