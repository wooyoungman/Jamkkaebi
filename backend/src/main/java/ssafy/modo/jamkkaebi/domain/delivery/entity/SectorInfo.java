package ssafy.modo.jamkkaebi.domain.delivery.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectorInfo {

    @CreatedDate
    private LocalDateTime createdDate;
    private String deviceUuid;
    private List<List<Double>> sectors;
}
