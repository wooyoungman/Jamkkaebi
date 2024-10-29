package ssafy.modo.jamkkaebi.domain.member.entity;

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

    // 매니저가 현재 유저로 설정된 Member 목록을 맵핑 -> 현재 유저가 관리하는 driver 목록
    @OneToMany(mappedBy = "manager")
    private Set<ManagerAndDriver> assignedDrivers = new HashSet<>();

    // driver가 현재 유저로 설정된 Member 목록을 맵핑 -> 현재 유저를 관리하는 manager 목록
    // @OneToMany(mappedBy = "driver")
    // private Set<AdminAndDriver> assignedManagers = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toString()));
    }

    @Builder
    public Member(String name, String username, String password) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.role = MemberRole.DRIVER;
    }

    public void updateRole() {
        this.role = this.role == MemberRole.MANAGER ? MemberRole.DRIVER : MemberRole.MANAGER;
    }
}
