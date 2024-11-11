package ssafy.modo.jamkkaebi.domain.vehicle.exception;

public class DriverHasVehicleException extends RuntimeException {

    @Override
    public String getMessage() {
        return VehicleExceptionMessage.DRIVER_HAS_VEHICLE.getMessage();
    }

    public int getStatus() {
        return VehicleExceptionMessage.DRIVER_HAS_VEHICLE.getStatus();
    }
}
