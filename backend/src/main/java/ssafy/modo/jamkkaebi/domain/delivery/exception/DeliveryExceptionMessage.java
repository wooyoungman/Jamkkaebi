package ssafy.modo.jamkkaebi.domain.delivery.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum DeliveryExceptionMessage {
    DELIVERY_NOT_FOUND("Delivery not found", HttpStatus.NOT_FOUND.value()),
    DELIVERY_DISPATCHED("Delivery has already dispatched", HttpStatus.CONFLICT.value());

    private final String message;
    private final int status;

    DeliveryExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
