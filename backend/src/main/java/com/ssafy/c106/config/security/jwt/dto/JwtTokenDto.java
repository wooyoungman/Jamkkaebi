package com.ssafy.c106.config.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtTokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
}
