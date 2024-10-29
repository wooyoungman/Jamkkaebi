package com.ssafy.c106.domain.member.exception;


public class UserNotFoundException extends RuntimeException {

    @Override
    public String getMessage() {
        return MemberExceptionMessage.USER_NOT_FOUND.getMessage();
    }

    public int getStatus() {
        return MemberExceptionMessage.USER_NOT_FOUND.getStatus();
    }
}
