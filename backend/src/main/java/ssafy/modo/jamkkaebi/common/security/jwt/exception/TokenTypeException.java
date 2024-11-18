package ssafy.modo.jamkkaebi.common.security.jwt.exception;

public class TokenTypeException extends Exception {

    @Override
    public String getMessage() {
        return JwtExceptionMessage.TYPE_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return JwtExceptionMessage.TYPE_NOT_FOUND.getStatus();
    }
}
