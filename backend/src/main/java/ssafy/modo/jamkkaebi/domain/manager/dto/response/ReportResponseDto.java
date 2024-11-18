package ssafy.modo.jamkkaebi.domain.manager.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.member.entity.MemberStatus;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponseDto {

    private DriverInfo driverInfo;
    private WeekData distance;
    private WeekData driveTime;
    private WeekData avgSleepIndex;
    private WeekData eegData;

    @Data
    @Builder
    public static class DriverInfo {
        private String driverName;
        private String vehicleNumber;
        private String phoneNumber;
        private String region;
        private MemberStatus status;
    }

    @Data
    @Builder
    public static class WeekData {
        private List<Long> lastWeek;
        private List<Long> thisWeek;
    }
}
