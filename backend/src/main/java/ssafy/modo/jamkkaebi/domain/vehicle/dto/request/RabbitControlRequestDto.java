package ssafy.modo.jamkkaebi.domain.vehicle.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.vehicle.entity.ControlType;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RabbitControlRequestDto {

    private Integer target;
    private Integer control;
    private Integer red;
    private Integer green;
    private Integer blue;
    private Integer brightness;
    private Boolean abnormal;

    @Builder
    RabbitControlRequestDto(VehicleControlRequestDto dto, boolean abnormal) {
        this.target = targetConverter(dto.getTarget());
        this.control = dto.getControl();
        this.red = dto.getRed();
        this.green = dto.getGreen();
        this.blue = dto.getBlue();
        this.brightness = dto.getBrightness();
        this.abnormal = abnormal;
    }

    private int targetConverter(ControlType type) {
        return switch (type) {
            case VIBRATION, AWAKE, WAKE:
                yield 0;
            case LIGHT:
                yield 1;
            case WINDOW:
                yield 2;
            case MOTOR:
                yield 3;
        };
    }
}
