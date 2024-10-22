package com.ssafy.c106.domain.member.entity;

import com.ssafy.c106.common.entity.BaseEntity;
import com.ssafy.c106.domain.member.dto.request.RegisterDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    @NotNull
    @Column(unique = true)
    private String username;

    @NotNull
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    private MemberRole role;

    @Builder
    public Member(RegisterDto registerDto) {
        this.name = registerDto.getName();
        this.username = registerDto.getUsername();
        this.password = new BCryptPasswordEncoder().encode(registerDto.getPassword());
        this.role = MemberRole.DRIVER;
    }
}
