package ssafy.modo.jamkkaebi.domain.delivery.respository.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;
import ssafy.modo.jamkkaebi.domain.delivery.entity.LowFocusSector;

public interface LowFocusSectorRepository extends MongoRepository<LowFocusSector, String> {
}
