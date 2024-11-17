package ssafy.modo.jamkkaebi.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;
import ssafy.modo.jamkkaebi.domain.member.dto.response.RegisterSuccessDto;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.exception.DuplicatedNameException;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.repository.MemberRepository;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MemberWriteService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public RegisterSuccessDto register(RegisterDto registerDto) {

        if (memberRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            throw new DuplicatedNameException();
        }

        Member member = memberRepository.save(
                Member.builder()
                        .dto(registerDto)
                        .password(passwordEncoder.encode(registerDto.getPassword()))
                        .build());

        return RegisterSuccessDto.builder()
                .name(member.getName())
                .username(member.getUsername())
                .registerDate(member.getCreatedDate())
                .build();
    }

    public MemberRole updateRole(Long memberId) {

        Member targetMember = memberRepository.findById(memberId).orElseThrow(UserNotFoundException::new);

        log.info("Member {}'s original role: {}", memberId, targetMember.getRole());
        if (targetMember.getRole().equals(MemberRole.MANAGER)) {
            // TODO: 매니저에게 연결된 운전자가 있는지 확인
            log.info("Manager -> Driver: 매니저에게 연결된 운전자가 있는지 확인");
        }
        targetMember.updateRole();
        log.info("Member {}'s updated role: {}", memberId, targetMember.getRole());

        return targetMember.getRole();
    }
}
