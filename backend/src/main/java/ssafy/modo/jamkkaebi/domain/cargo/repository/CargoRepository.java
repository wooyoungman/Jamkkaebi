package ssafy.modo.jamkkaebi.domain.cargo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.modo.jamkkaebi.domain.cargo.entity.Cargo;

public interface CargoRepository extends JpaRepository<Cargo, Long> {
}
