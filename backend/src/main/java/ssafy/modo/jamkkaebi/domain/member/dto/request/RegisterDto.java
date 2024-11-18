package ssafy.modo.jamkkaebi.domain.member.dto.request;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

    private String name;
    private String username;
    private String password;
    private String region;
    @Nullable
    private String profileImage;
    private String phoneNumber;
}
