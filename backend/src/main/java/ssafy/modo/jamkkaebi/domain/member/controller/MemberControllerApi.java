package ssafy.modo.jamkkaebi.domain.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.tags.Tag;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.domain.member.dto.response.MemberInfoResponseDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;

@Tag(name = "회원 컨트롤러", description = "가입, 정보 수정 등 회원과 관련된 작업을 수행하는 API")
public interface MemberControllerApi {

    ApiResponse<RegisterSuccessDto> register(String payload) throws JsonProcessingException;

    ApiResponse<JwtTokenDto> login(String payload) throws JsonProcessingException;

    ApiResponse<?> validate(String bearerToken) throws TokenTypeException, TokenExpirationException;

    ApiResponse<MemberRole> updateRole(Long memberId);

    ApiResponse<MemberInfoResponseDto> getSimpleInfo();
}
