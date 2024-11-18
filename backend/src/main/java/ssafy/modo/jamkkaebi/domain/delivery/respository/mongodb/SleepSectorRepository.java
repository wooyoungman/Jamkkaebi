package ssafy.modo.jamkkaebi.domain.delivery.respository.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;
import ssafy.modo.jamkkaebi.domain.delivery.entity.SleepSector;

public interface SleepSectorRepository extends MongoRepository<SleepSector, String> {
}
