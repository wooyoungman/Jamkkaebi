package com.ssafy.c106.domain.member.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterDto {

    private String name;
    private String username;
    private String password;
}
