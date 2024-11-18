package ssafy.modo.jamkkaebi.common.security.filter;

import ssafy.modo.jamkkaebi.common.security.jwt.service.CustomUserDetailsService;
import ssafy.modo.jamkkaebi.common.security.jwt.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws IOException, ServletException {

        String token = resolveToken(request);

        if (token != null && jwtService.validateToken(token)) {
            Member member = userDetailsService.loadUserByUsername(jwtService.getUsername(token));
            Authentication authentication = jwtService.getAuthentication(member);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Passed Token filter for token {}", token);
        } else {
            log.info("Cannot validate token {}", token);
        }

        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {

        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        } else {
            return null;
        }
    }
}
