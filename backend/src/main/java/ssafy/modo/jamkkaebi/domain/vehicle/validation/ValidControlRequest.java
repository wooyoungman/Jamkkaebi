package ssafy.modo.jamkkaebi.domain.vehicle.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = VehicleControlValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidControlRequest {

    String message() default "Invalid Vehicle Control Request, check control value";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
