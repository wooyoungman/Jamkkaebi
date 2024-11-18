package ssafy.modo.jamkkaebi.domain.manager.exception;

public class DriverConflictException extends RuntimeException {

    @Override
    public String getMessage() {
        return ManagerExceptionMessage.DRIVER_ALREADY_CONNECTED.getMessage();
    }

    public int getStatus() {
        return ManagerExceptionMessage.DRIVER_ALREADY_CONNECTED.getStatus();
    }
}
