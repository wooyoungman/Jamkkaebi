package ssafy.modo.jamkkaebi.domain.delivery.exception;

public class DeliveryDispatchedException extends RuntimeException {

    @Override
    public String getMessage() {
        return DeliveryExceptionMessage.DELIVERY_DISPATCHED.getMessage();
    }

    public int getStatus() {
        return DeliveryExceptionMessage.DELIVERY_DISPATCHED.getStatus();
    }
}
