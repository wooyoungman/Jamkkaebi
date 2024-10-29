package ssafy.modo.jamkkaebi.common.security.jwt.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum JwtExceptionMessage {
    TYPE_NOT_FOUND("Token type information is unavailable.", HttpStatus.NOT_FOUND.value()),
    EXPIRATION_NOT_FOUND("Token exipration information is unavailable.", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    JwtExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
