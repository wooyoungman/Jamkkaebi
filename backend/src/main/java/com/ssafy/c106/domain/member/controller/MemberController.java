package com.ssafy.c106.domain.member.controller;

import com.ssafy.c106.common.ApiResponse;
import com.ssafy.c106.common.security.jwt.dto.JwtTokenDto;
import com.ssafy.c106.domain.member.dto.request.LoginDto;
import com.ssafy.c106.domain.member.dto.request.RegisterDto;
import com.ssafy.c106.domain.member.dto.response.RegisterSuccessDto;
import com.ssafy.c106.domain.member.service.MemberReadService;
import com.ssafy.c106.domain.member.service.MemberWriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
