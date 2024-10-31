package ssafy.modo.jamkkaebi.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.common.security.jwt.service.JwtService;
import ssafy.modo.jamkkaebi.common.security.util.SecurityUtil;
import ssafy.modo.jamkkaebi.domain.member.dto.request.LoginDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.ValidateSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberReadService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final SecurityUtil securityUtil;

    public JwtTokenDto login(LoginDto loginDto) {

        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authentication = authenticationManager.authenticate(authToken);
        log.info("Login Principal instance: {}", authentication.getPrincipal().getClass());
        JwtTokenDto tokenDto = jwtService.generateToken(authentication);

        Member member = (Member) authentication.getPrincipal();
        tokenDto.setMemberId(member.getId());

        return tokenDto;
    }

    public ValidateSuccessDto validate(String token) throws TokenTypeException, TokenExpirationException {
        log.info("Token to validate: {}", token);
        log.info("Member Auth info: {} (ID: {}), {}",
                securityUtil.getCurrentUsername(), securityUtil.getCurrentUserId(), securityUtil.getCurrentUserRole());
        return ValidateSuccessDto
                .builder()
                .tokenType(jwtService.getTokenType(token))
                .expiration(jwtService.getExpiration(token))
                .build();
    }
}
