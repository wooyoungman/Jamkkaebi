package ssafy.modo.jamkkaebi.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.modo.jamkkaebi.domain.member.entity.ManagerAndDriver;

import java.util.Optional;

public interface ManagerDriverRepository extends JpaRepository<ManagerAndDriver, Long> {

    Optional<ManagerAndDriver> findByDriverId(Long driverId);

    Boolean existsByDriverId(Long driverId);

    Integer countByManagerId(Long managerId);
}
