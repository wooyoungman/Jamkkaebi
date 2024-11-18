package ssafy.modo.jamkkaebi.domain.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.domain.member.dto.request.LoginDto;
import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.MemberInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.service.MemberReadService;
import ssafy.modo.jamkkaebi.domain.member.service.MemberWriteService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController implements MemberControllerApi {

    private final MemberWriteService memberWriteService;
    private final MemberReadService memberReadService;
    private final ObjectMapper objectMapper;

    @PostMapping(path = "/register",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<RegisterSuccessDto> register(@Valid @RequestBody String payload) throws JsonProcessingException {

        RegisterDto registerDto = objectMapper.readValue(payload, RegisterDto.class);
        return ApiResponse.success(memberWriteService.register(registerDto));
    }

    @PostMapping(path = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<JwtTokenDto> login(@Valid @RequestBody String payload) throws JsonProcessingException {

        LoginDto loginDto = objectMapper.readValue(payload, LoginDto.class);
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

    @PatchMapping("/update/{member_id}")
    public ApiResponse<MemberRole> updateRole(@PathVariable("member_id") Long memberId) {
        return ApiResponse.success(memberWriteService.updateRole(memberId));
    }

    @GetMapping("/info/simple")
    public ApiResponse<MemberInfoResponseDto> getSimpleInfo() {
        MemberInfoResponseDto memberInfoResponseDto = memberReadService.getSimpleInfo();
        return ApiResponse.success(memberInfoResponseDto);
    }
}
