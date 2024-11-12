package ssafy.modo.jamkkaebi.domain.device.exception;

public class DeviceNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return DeviceExceptionMessage.DEVICE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return DeviceExceptionMessage.DEVICE_NOT_FOUND.getStatus();
    }
}
