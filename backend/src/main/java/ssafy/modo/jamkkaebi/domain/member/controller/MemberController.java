package ssafy.modo.jamkkaebi.domain.member.controller;

import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.domain.member.dto.request.LoginDto;
import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.service.MemberReadService;
import ssafy.modo.jamkkaebi.domain.member.service.MemberWriteService;
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
