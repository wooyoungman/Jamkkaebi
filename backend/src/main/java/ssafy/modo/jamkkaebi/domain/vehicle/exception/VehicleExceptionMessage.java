package ssafy.modo.jamkkaebi.domain.vehicle.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum VehicleExceptionMessage {
    DUPLICATED_VEHICLE_NUMBER(HttpStatus.CONFLICT.value(), "Already registered vehicle number"),
    VEHICLE_NOT_FOUND(HttpStatus.NOT_FOUND.value(), "Vehicle not found"),
    DRIVER_HAS_VEHICLE(HttpStatus.CONFLICT.value(), "Driver already mapped to a vehicle"),
    VEHICLE_HAS_DRIVER(HttpStatus.CONFLICT.value(), "Vehicle already mapped to a driver"),
    CONTROL_NOT_AUTHORIZED(HttpStatus.UNAUTHORIZED.value(), "You do not have authorization to contol"),
    ;

    private final String message;
    private final int status;

    VehicleExceptionMessage(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
