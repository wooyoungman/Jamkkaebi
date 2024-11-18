package ssafy.modo.jamkkaebi.domain.route.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import ssafy.modo.jamkkaebi.domain.route.entity.Route;

public interface RouteRepository extends MongoRepository<Route, String> {
}
