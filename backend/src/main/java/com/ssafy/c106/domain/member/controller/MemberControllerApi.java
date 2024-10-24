package com.ssafy.c106.domain.member.controller;

import com.ssafy.c106.common.ApiResponse;
import com.ssafy.c106.common.security.jwt.dto.JwtTokenDto;
import com.ssafy.c106.domain.member.dto.request.LoginDto;
import com.ssafy.c106.domain.member.dto.request.RegisterDto;
import com.ssafy.c106.domain.member.dto.response.RegisterSuccessDto;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "회원 컨트롤러", description = "가입, 정보 수정 등 회원과 관련된 작업을 수행하는 API")
public interface MemberControllerApi {

    ApiResponse<RegisterSuccessDto> register(RegisterDto registerDto);

    ApiResponse<JwtTokenDto> login(LoginDto loginDto);
}
