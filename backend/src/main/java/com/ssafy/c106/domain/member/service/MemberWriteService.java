package com.ssafy.c106.domain.member.service;

import com.ssafy.c106.domain.member.dto.request.RegisterDto;
import com.ssafy.c106.domain.member.dto.response.RegisterSuccessDto;
import com.ssafy.c106.domain.member.entity.Member;
import com.ssafy.c106.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberWriteService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterSuccessDto register(RegisterDto registerDto) {
        Member member = memberRepository.save(
                Member.builder()
                        .username(registerDto.getUsername())
                        .password(passwordEncoder.encode(registerDto.getPassword()))
                        .name(registerDto.getName())
                        .build());

        return RegisterSuccessDto.builder()
                .name(member.getName())
                .username(member.getUsername())
                .registerDate(member.getCreatedDate())
                .build();
    }
}
