package ssafy.modo.jamkkaebi.domain.vehicle.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ssafy.modo.jamkkaebi.domain.vehicle.dto.request.VehicleControlRequestDto;

public class VehicleControlValidator implements ConstraintValidator<ValidControlRequest, VehicleControlRequestDto> {

    @Override
    public boolean isValid(VehicleControlRequestDto dto, ConstraintValidatorContext context) {

        if (dto.getControl() == null) {
            return true;
        }

        int control = dto.getControl();
        return switch (dto.getTarget()) {
            case VIBRATION, MOTOR -> control == 0 || control == 1;
            case LIGHT -> 0 <= control && control <= 2;
            case WINDOW -> -1 <= control && control <= 1;
        };
    }
}
