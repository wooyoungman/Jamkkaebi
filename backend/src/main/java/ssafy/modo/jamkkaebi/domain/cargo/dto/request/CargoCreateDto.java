package ssafy.modo.jamkkaebi.domain.cargo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CargoCreateDto {

    @NotBlank(message = "출발지 주소가 입력되지 않았습니다.")
    private String origin;
    @NotBlank(message = "도착지 주소가 입력되지 않았습니다.")
    private String destination;
    @NotBlank(message = "화물 정보가 입력되지 않았습니다.")
    private String cargo;
    private LocalDateTime dueDate;
}
