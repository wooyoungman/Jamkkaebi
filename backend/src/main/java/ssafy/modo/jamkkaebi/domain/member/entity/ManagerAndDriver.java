package ssafy.modo.jamkkaebi.domain.member.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "driver_id"))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManagerAndDriver extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "driver_id", unique = true)
    private Member driver;

    @ManyToOne
    @JoinColumn(name = "manager_id")
    private Member manager;

    @Builder
    public ManagerAndDriver(Member driver, Member manager) {
        this.manager = manager;
        this.driver = driver;
    }
}
