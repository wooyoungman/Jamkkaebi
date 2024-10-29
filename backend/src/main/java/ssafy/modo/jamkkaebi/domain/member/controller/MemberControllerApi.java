package ssafy.modo.jamkkaebi.domain.member.controller;

import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.domain.member.dto.request.LoginDto;
import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "회원 컨트롤러", description = "가입, 정보 수정 등 회원과 관련된 작업을 수행하는 API")
public interface MemberControllerApi {

    ApiResponse<RegisterSuccessDto> register(RegisterDto registerDto);

    ApiResponse<JwtTokenDto> login(LoginDto loginDto);

    ApiResponse<?> validate(String bearerToken) throws TokenTypeException, TokenExpirationException;
}
