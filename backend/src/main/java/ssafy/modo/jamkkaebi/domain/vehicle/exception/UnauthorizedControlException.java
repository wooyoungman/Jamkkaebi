package ssafy.modo.jamkkaebi.domain.vehicle.exception;

public class UnauthorizedControlException extends RuntimeException {

    @Override
    public String getMessage() {
        return VehicleExceptionMessage.CONTROL_NOT_AUTHORIZED.getMessage();
    }

    public int getStatus() {
        return VehicleExceptionMessage.CONTROL_NOT_AUTHORIZED.getStatus();
    }
}
