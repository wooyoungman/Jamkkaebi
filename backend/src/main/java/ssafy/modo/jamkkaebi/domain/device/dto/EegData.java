package ssafy.modo.jamkkaebi.domain.device.dto;

import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class EegData {

    @Nullable
    private Float delta;
    @Nullable
    private Float theta;
    @Nullable
    private Float lowAlpha;
    @Nullable
    private Float highAlpha;
    @Nullable
    private Float lowBeta;
    @Nullable
    private Float highBeta;
    @Nullable
    private Float lowGamma;
    @Nullable
    private Float highGamma;
}