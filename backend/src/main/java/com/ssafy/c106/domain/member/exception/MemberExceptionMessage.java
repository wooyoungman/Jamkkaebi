package com.ssafy.c106.domain.member.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum MemberExceptionMessage {
    WRONG_PASSWORD("Incorrect Password", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    MemberExceptionMessage(String message, int status) {
        this.message = message;
        this.status = status;
    }
}
