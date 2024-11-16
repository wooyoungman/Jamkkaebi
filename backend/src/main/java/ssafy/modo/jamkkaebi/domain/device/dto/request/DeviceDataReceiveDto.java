package ssafy.modo.jamkkaebi.domain.device.dto.request;

import lombok.Data;
import ssafy.modo.jamkkaebi.domain.device.dto.EegData;
import ssafy.modo.jamkkaebi.domain.device.dto.ScoreData;
import ssafy.modo.jamkkaebi.domain.driver.entity.DriverStatus;

@Data
public class DeviceDataReceiveDto {

    private String uuid;
    private Long driverId;
    private DriverStatus driverStatus;
    private Double coordinateX;
    private Double coordinateY;
    private Integer emg;
    private EegData eeg;
    private ScoreData score;
}
