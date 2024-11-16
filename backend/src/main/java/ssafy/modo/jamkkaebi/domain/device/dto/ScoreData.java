package ssafy.modo.jamkkaebi.domain.device.dto;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class ScoreData {

    @Nullable
    private Integer attention;
    @Nullable
    private Integer meditation;
}
