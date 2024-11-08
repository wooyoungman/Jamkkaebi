package ssafy.modo.jamkkaebi.domain.cargo.exception;

public class CargoNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return CargoExceptionMessage.CARGO_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return CargoExceptionMessage.CARGO_NOT_FOUND.getStatus();
    }
}
