package ssafy.modo.jamkkaebi.common.security.util;

import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;
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
