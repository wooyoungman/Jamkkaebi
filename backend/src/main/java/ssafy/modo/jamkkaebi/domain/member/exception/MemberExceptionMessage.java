package ssafy.modo.jamkkaebi.domain.member.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberExceptionMessage {
    USER_NOT_FOUND("User Not Found", HttpStatus.NOT_FOUND.value()),
    WRONG_PASSWORD("Incorrect Password", HttpStatus.BAD_REQUEST.value()),
    DUPLICATED_NAME("Duplicated Username", HttpStatus.CONFLICT.value()),
    MANAGER_NOT_FOUND("Manager Not Found", HttpStatus.NOT_FOUND.value()),
    DRIVER_NOT_FOUND("Driver Not Found", HttpStatus.NOT_FOUND.value());

    private final String message;
    private final int status;

    MemberExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
