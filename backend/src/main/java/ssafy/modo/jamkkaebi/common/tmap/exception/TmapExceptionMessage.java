package ssafy.modo.jamkkaebi.common.tmap.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum TmapExceptionMessage {
    DESERIALIZATION_FAILED("Failed to deserialize GeoJSON route data.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    INVALID_ADDRESS("Requested address is not valid.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    TmapExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
