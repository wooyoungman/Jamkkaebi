package ssafy.modo.jamkkaebi.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByUsername(String username);

    @Query("""
            SELECT m FROM Member m
            LEFT JOIN ManagerAndDriver md ON m.id = md.driver.id
            WHERE m.role = 'DRIVER' AND md.driver.id IS NULL
            """)
    List<Member> findUnmanagedDriver();

    @Query("""
            SELECT m FROM Member m
            LEFT JOIN ManagerAndDriver md ON m.id = md.driver.id
            WHERE m.role = 'DRIVER' AND md.manager.id = :managerId
            """)
    List<Member> findManagedDriver(Long managerId);

    @Query("""
            SELECT NEW MAP (m1 AS manager, m2 AS driver)
            FROM Member m1
            JOIN ManagerAndDriver md ON m1.id = md.manager.id
            JOIN Member m2 ON m2.id = md.driver.id
            WHERE m1.id = :managerId AND m2.id = :driverId
            """)
    Map<String, Member> findManagerAndDriver(Long managerId, Long driverId);
}
