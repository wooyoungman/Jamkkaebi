package ssafy.modo.jamkkaebi.domain.member.exception;

public class DriverNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.DRIVER_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.DRIVER_NOT_FOUND.getStatus();
    }
}
