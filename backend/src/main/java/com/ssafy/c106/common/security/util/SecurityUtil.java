package com.ssafy.c106.common.security.util;

import com.ssafy.c106.domain.member.entity.Member;
import com.ssafy.c106.domain.member.exception.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

@RequiredArgsConstructor
public class SecurityUtil {

    public Long getCurrentUserId() {
        return getAuthentication().getId();
    }

    public String getCurrentUsername() {
        return getAuthentication().getUsername();
    }

    private Member getAuthentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof UserDetails) {
            return (Member) auth.getPrincipal();
        }
        throw new UserNotFoundException();
    }
}
