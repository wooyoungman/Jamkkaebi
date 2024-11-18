package ssafy.modo.jamkkaebi.domain.member.entity;

import com.mongodb.lang.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ssafy.modo.jamkkaebi.common.entity.BaseEntity;
import ssafy.modo.jamkkaebi.domain.member.dto.request.RegisterDto;

import java.util.Collection;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity implements UserDetails {

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

    @NotNull
    @Enumerated(EnumType.STRING)
    private MemberStatus status;

    @NotNull
    private String phoneNumber;

    @Nullable
    private String profileImage;

    @NotNull
    private String region;

    // 매니저가 현재 유저로 설정된 Member 목록을 맵핑 -> 현재 유저가 관리하는 driver 목록
    @OneToMany(mappedBy = "manager")
    private Set<ManagerAndDriver> assignedDrivers = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toString()));
    }

    @Builder
    public Member(RegisterDto dto, String password) {
        this.name = dto.getName();
        this.username = dto.getUsername();
        this.password = password;
        this.role = MemberRole.DRIVER;
        this.status = MemberStatus.IDLE;
        this.phoneNumber = dto.getPhoneNumber();
        this.profileImage = (dto.getProfileImage() != null) ? dto.getProfileImage() : null;
        this.region = dto.getRegion();
    }

    public MemberRole updateRole() {
        this.role = this.role == MemberRole.MANAGER ? MemberRole.DRIVER : MemberRole.MANAGER;
        return this.role;
    }
}
