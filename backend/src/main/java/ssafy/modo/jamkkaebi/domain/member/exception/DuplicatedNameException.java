package ssafy.modo.jamkkaebi.domain.member.exception;

public class DuplicatedNameException extends RuntimeException {

    public String getMessage() {
        return MemberExceptionMessage.DUPLICATED_NAME.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.DUPLICATED_NAME.getStatus();
    }
}
