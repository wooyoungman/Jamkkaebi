package ssafy.modo.jamkkaebi.domain.device.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum DeviceExceptionMessage {
    DEVICE_NOT_FOUND("Device with given UUID does not exist", HttpStatus.BAD_REQUEST.value()),
    ;

    private String message;
    private int status;

    DeviceExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
