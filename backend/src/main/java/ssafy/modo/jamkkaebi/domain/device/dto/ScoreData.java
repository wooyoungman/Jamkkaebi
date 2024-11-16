package ssafy.modo.jamkkaebi.domain.device.dto;

import jakarta.annotation.Nullable;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.driver.entity.DriverStatus;

@Data
public class ScoreData {

    @Nullable
    private Integer attention;
    @Nullable
    private Integer meditation;
    @Nullable
    private DriverStatus classification;
}
