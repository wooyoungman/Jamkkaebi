package ssafy.modo.jamkkaebi.domain.cargo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cargo extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String cargo;

    @NotNull
    private String origin;

    @NotNull
    private String originCoordinate;

    @NotNull
    private String destination;

    @NotNull
    private String destinationCoordinate;

    @NotNull
    private LocalDateTime dueDate;

    @NotNull
    private Float distance;
}
