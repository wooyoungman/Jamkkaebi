package com.ssafy.c106.domain.member.controller;

import com.ssafy.c106.common.ApiResponse;
import com.ssafy.c106.common.security.jwt.dto.JwtTokenDto;
import com.ssafy.c106.common.security.jwt.exception.TokenExpirationException;
import com.ssafy.c106.common.security.jwt.exception.TokenTypeException;
import com.ssafy.c106.domain.member.dto.request.LoginDto;
import com.ssafy.c106.domain.member.dto.request.RegisterDto;
import com.ssafy.c106.domain.member.dto.response.RegisterSuccessDto;
import com.ssafy.c106.domain.member.service.MemberReadService;
import com.ssafy.c106.domain.member.service.MemberWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController implements MemberControllerApi {

    private final MemberWriteService memberWriteService;
    private final MemberReadService memberReadService;

    @PostMapping("/register")
    public ApiResponse<RegisterSuccessDto> register(RegisterDto registerDto) {
        return ApiResponse.success(memberWriteService.register(registerDto));
    }

    @PostMapping("/login")
    public ApiResponse<JwtTokenDto> login(LoginDto loginDto) {
        return ApiResponse.success(memberReadService.login(loginDto));
    }

    @GetMapping("/validate")
    public ApiResponse<?> validate(@RequestHeader("Authorization") String bearerToken)
            throws TokenTypeException, TokenExpirationException {
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return ApiResponse.success(memberReadService.validate(bearerToken.substring(7)));
        } else {
            return ApiResponse.error(HttpStatus.BAD_REQUEST.value(), "Empty token header");
        }
    }
}
