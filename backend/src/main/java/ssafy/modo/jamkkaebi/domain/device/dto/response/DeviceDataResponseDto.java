package ssafy.modo.jamkkaebi.domain.device.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.modo.jamkkaebi.domain.device.dto.EegData;
import ssafy.modo.jamkkaebi.domain.device.dto.ScoreData;
import ssafy.modo.jamkkaebi.domain.device.dto.request.DeviceDataReceiveDto;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeviceDataResponseDto {

    private Long driverId;
    private EegData brain;
    private Integer muscle;
    private ScoreData predictions;
    private List<Double> coordinate;

    public DeviceDataResponseDto(DeviceDataReceiveDto receiveDto) {
        this.driverId = receiveDto.getDriverId();
        this.brain = receiveDto.getEeg();
        this.muscle = receiveDto.getEmg();

        this.predictions = receiveDto.getScore();
        predictions.setClassification(receiveDto.getDriverStatus());

        this.coordinate = new ArrayList<>();
        coordinate.add(receiveDto.getCoordinateX());
        coordinate.add(receiveDto.getCoordinateY());
    }
}
