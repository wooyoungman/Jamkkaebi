package ssafy.modo.jamkkaebi.domain.member.dto.response;

import lombok.Builder;
import lombok.Data;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberRole;

@Data
@Builder
public class MemberInfoResponseDto {

    private MemberRole memberType;
    private Long memberId;
    private String memberName;
    private Object additionalInfo;
}
