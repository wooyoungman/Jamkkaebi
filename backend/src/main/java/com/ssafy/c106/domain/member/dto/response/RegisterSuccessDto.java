package com.ssafy.c106.domain.member.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class RegisterSuccessDto {

    private String name;
    private String username;
    private LocalDateTime registerDate;
}
