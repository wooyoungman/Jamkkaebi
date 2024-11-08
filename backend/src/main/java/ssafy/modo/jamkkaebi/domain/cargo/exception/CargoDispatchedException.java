package ssafy.modo.jamkkaebi.domain.cargo.exception;

public class CargoDispatchedException extends RuntimeException {

    @Override
    public String getMessage() {
        return CargoExceptionMessage.CARGO_DISPATCHED.getMessage();
    }

    public int getStatus() {
        return CargoExceptionMessage.CARGO_DISPATCHED.getStatus();
    }
}
