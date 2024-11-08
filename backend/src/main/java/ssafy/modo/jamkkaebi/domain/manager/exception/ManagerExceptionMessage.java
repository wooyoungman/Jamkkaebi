package ssafy.modo.jamkkaebi.domain.manager.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ManagerExceptionMessage {
    DRIVER_ALREADY_CONNECTED("Driver already being managed", HttpStatus.CONFLICT.value());

    private final String message;
    private final int status;

    ManagerExceptionMessage(String message, int status) {
        this.status = status;
        this.message = message;
    }
}
