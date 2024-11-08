package ssafy.modo.jamkkaebi.domain.member.exception;

public class ManagerNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.MANAGER_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.MANAGER_NOT_FOUND.getStatus();
    }
}
