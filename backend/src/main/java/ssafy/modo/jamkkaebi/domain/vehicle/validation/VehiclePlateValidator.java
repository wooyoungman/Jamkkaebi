package ssafy.modo.jamkkaebi.domain.vehicle.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class VehiclePlateValidator implements ConstraintValidator<ValidVehiclePlate, String> {

    private static final String KOREAN_PLATE_REGEX = "^[0-9]{2,3}[가-힣] [0-9]{4}$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return false;
        }
        return value.matches(KOREAN_PLATE_REGEX);
    }
}
