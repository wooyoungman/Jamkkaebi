package ssafy.modo.jamkkaebi.domain.member.exception;

public class InvalidRelationshipException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.INVALID_RELATIONSHIP.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.INVALID_RELATIONSHIP.getStatus();
    }
}
