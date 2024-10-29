package ssafy.modo.jamkkaebi.domain.member.service;

import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;
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
