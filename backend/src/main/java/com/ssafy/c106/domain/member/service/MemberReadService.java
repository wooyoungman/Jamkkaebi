package com.ssafy.c106.domain.member.service;

import com.ssafy.c106.common.security.jwt.dto.JwtTokenDto;
import com.ssafy.c106.common.security.jwt.service.JwtService;
import com.ssafy.c106.domain.member.dto.request.LoginDto;
import com.ssafy.c106.domain.member.entity.Member;
import com.ssafy.c106.domain.member.exception.WrongPasswordException;
import com.ssafy.c106.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberReadService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public JwtTokenDto login(LoginDto loginDto) {

        String username = loginDto.getUsername();
        String password = loginDto.getPassword();

        Member userInfo = memberRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found: " + username));
        String storedPassword = userInfo.getPassword();

        if (passwordEncoder.matches(password, storedPassword)) {
            return getLoginToken(userInfo);
        } else {
            throw new WrongPasswordException();
        }
    }

    private JwtTokenDto getLoginToken(Member member) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                member.getUsername(), member.getPassword());
        Authentication authentication = authenticationManager.authenticate(authToken);

        JwtTokenDto tokenDto = jwtService.generateToken(authentication);
        tokenDto.setMemberId(member.getId());

        return tokenDto;
    }
}
