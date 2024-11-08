package ssafy.modo.jamkkaebi.common.tmap.exception;

public class InvalidAddressException extends RuntimeException {

    @Override
    public String getMessage() {
        return TmapExceptionMessage.INVALID_ADDRESS.getMessage();
    }

    public int getStatus() {
        return TmapExceptionMessage.INVALID_ADDRESS.getStatus();
    }
}
