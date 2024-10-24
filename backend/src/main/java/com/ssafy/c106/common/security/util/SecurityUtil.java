package com.ssafy.c106.common.security.util;

import com.ssafy.c106.domain.member.entity.Member;
import com.ssafy.c106.domain.member.exception.UserNotFoundException;
import com.ssafy.c106.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@RequiredArgsConstructor
public class SecurityUtil {

    private final MemberRepository memberRepository;

    public Long getCurrentUserId() {
        return getAuthentication().getId();
    }

    public String getCurrentUsername() {
        return getAuthentication().getUsername();
    }

    private Member getAuthentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails) {
            String username = ((UserDetails) auth.getPrincipal()).getUsername();
            return memberRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User Not Found: " + username));
        }
        throw new UserNotFoundException();
    }
}
