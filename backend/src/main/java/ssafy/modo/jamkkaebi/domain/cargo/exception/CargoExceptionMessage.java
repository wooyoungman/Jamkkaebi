package ssafy.modo.jamkkaebi.domain.cargo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum CargoExceptionMessage {
    CARGO_NOT_FOUND("Cargo not found", HttpStatus.NOT_FOUND.value()),
    CARGO_DISPATCHED("Cargo has already dispatched", HttpStatus.CONFLICT.value());

    private final String message;
    private final int status;

    CargoExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
