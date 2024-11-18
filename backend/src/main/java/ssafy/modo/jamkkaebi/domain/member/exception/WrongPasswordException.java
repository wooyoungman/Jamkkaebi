package ssafy.modo.jamkkaebi.domain.member.exception;

public class WrongPasswordException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.WRONG_PASSWORD.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.WRONG_PASSWORD.getStatus();
    }
}
