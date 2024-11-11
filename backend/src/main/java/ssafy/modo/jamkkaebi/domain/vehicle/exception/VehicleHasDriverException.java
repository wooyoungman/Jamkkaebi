package ssafy.modo.jamkkaebi.domain.vehicle.exception;

public class VehicleHasDriverException extends RuntimeException {

    @Override
    public String getMessage() {
        return VehicleExceptionMessage.VEHICLE_HAS_DRIVER.getMessage();
    }

    public int getStatus() {
        return VehicleExceptionMessage.VEHICLE_HAS_DRIVER.getStatus();
    }
}
