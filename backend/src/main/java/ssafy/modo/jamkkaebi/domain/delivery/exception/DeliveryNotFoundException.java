package ssafy.modo.jamkkaebi.domain.delivery.exception;

public class DeliveryNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return DeliveryExceptionMessage.DELIVERY_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return DeliveryExceptionMessage.DELIVERY_NOT_FOUND.getStatus();
    }
}
