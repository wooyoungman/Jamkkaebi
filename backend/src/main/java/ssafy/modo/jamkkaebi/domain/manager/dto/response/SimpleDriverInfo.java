package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import jakarta.annotation.Nullable;
import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberStatus;

@Data
@Builder
public class SimpleDriverInfo {

    private long driverId;
    private String driverName;
    @Nullable
    private String phoneNumber;
    @Nullable
    private String region;
    private MemberRole role;
    private String vehicleNumber;
    private MemberStatus status;
    @Nullable
    private String profileImage;
}
