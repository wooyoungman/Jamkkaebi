package ssafy.modo.jamkkaebi.domain.vehicle.exception;

public class VehicleNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return VehicleExceptionMessage.VEHICLE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return VehicleExceptionMessage.VEHICLE_NOT_FOUND.getStatus();
    }
}
