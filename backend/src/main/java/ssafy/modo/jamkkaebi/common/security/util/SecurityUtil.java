package ssafy.modo.jamkkaebi.common.security.util;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityUtil {

    public Long getCurrentUserId() {
        return getAuthentication().getId();
    }

    public String getCurrentUsername() {
        return getAuthentication().getUsername();
    }

    public MemberRole getCurrentUserRole() {
        return getAuthentication().getRole();
    }

    private Member getAuthentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof Member) {
            return (Member) auth.getPrincipal();
        } else {
            log.info("Principal instance: {}", auth.getPrincipal().getClass());
            throw new UserNotFoundException();
        }
    }
}
