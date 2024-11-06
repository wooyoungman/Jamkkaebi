package ssafy.modo.jamkkaebi.domain.cargo.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.domain.cargo.dto.request.CargoCreateDto;
import ssafy.modo.jamkkaebi.domain.cargo.dto.response.CargoCreateResponseDto;
import ssafy.modo.jamkkaebi.domain.cargo.service.CargoWriteService;

@RestController
@RequestMapping("/api/v1/cargo")
@RequiredArgsConstructor
public class CargoController {

    private final CargoWriteService cargoWriteService;

    @PostMapping("/create")
    public ApiResponse<CargoCreateResponseDto> createCargo(@Valid CargoCreateDto dto) throws JsonProcessingException {
        return ApiResponse.success(cargoWriteService.createCargo(dto));
    }
}
