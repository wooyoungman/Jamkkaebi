package ssafy.modo.jamkkaebi.common.security.jwt.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import ssafy.modo.jamkkaebi.common.security.jwt.dto.JwtTokenDto;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtService {

    private final SecretKey secretKey;

    @Value("${jwt.access.expiration}")
    private long accessExpiration;

    @Value("${jwt.refresh.expiration}")
    private long refreshExpiration;

    public JwtService(@Value("${jwt.secret}") String secret) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public JwtTokenDto generateToken(Authentication authentication) {

        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long currentTime = System.currentTimeMillis();

        String accessToken = Jwts.builder()
                .subject(authentication.getName())
                .claim("type", "access")
                .claim("authorities", authorities)
                .expiration(new Date(currentTime + accessExpiration))
                .signWith(secretKey)
                .compact();

        String refreshToken = Jwts.builder()
                .claim("type", "refresh")
                .expiration(new Date(currentTime + refreshExpiration))
                .signWith(secretKey)
                .compact();

        return JwtTokenDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(Member member) {

        Collection<? extends GrantedAuthority> authorities = member.getAuthorities();
        log.info("Authorities: {}", authorities);

        if (authorities != null) {
            return new UsernamePasswordAuthenticationToken(member, "", member.getAuthorities());
        } else {
            throw new RuntimeException("Member authority information not found");
        }

    }

    public boolean validateToken(String token)
            throws ExpiredJwtException, io.jsonwebtoken.security.SignatureException {

        parseClaims(token);
        return true;
    }

    public String getTokenType(String token) throws TokenTypeException {
        Object tokenType = parseClaims(token).get("type");
        if (tokenType != null) {
            log.info("Parsed token type: {}", tokenType);
            return tokenType.toString();
        } else {
            throw new TokenTypeException();
        }
    }

    public Boolean isExpired(String token) {
        return parseClaims(token).getExpiration().before(new Date());
    }

    public LocalDateTime getExpiration(String token) throws TokenExpirationException {
        Date expiration = parseClaims(token).getExpiration();
        if (expiration != null) {
            log.info("Parsed token expiration: {}", expiration);
            return LocalDateTime.ofInstant(expiration.toInstant(), ZoneId.systemDefault());
        } else {
            throw new TokenExpirationException();
        }
    }

    public String getUsername(String token) {
        return parseClaims(token).getSubject();
    }

    public MemberRole getRole(String token) {
        return MemberRole.valueOf(parseClaims(token).get("authorities", String.class));
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
