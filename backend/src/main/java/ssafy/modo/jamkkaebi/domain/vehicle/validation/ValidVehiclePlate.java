package ssafy.modo.jamkkaebi.domain.vehicle.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = VehiclePlateValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidVehiclePlate {

    String message() default "Invalid Vehicle Plate Format";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
