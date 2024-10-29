package ssafy.modo.jamkkaebi.common.security.jwt.exception;

public class TokenExpirationException extends RuntimeException {

    @Override
    public String getMessage() {
        return JwtExceptionMessage.EXPIRATION_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return JwtExceptionMessage.EXPIRATION_NOT_FOUND.getStatus();
    }
}
