package ssafy.modo.jamkkaebi.common.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class JwtTokenDto {

    private Long memberId;
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
