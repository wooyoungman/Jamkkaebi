package ssafy.modo.jamkkaebi.domain.vehicle.exception;

public class DuplicatedVehicleException extends RuntimeException {

    @Override
    public String getMessage() {
        return VehicleExceptionMessage.DUPLICATED_VEHICLE_NUMBER.getMessage();
    }

    public int getStatus() {
        return VehicleExceptionMessage.DUPLICATED_VEHICLE_NUMBER.getStatus();
    }
}
