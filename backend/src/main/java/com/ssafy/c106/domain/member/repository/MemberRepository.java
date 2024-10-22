package com.ssafy.c106.domain.member.repository;

import com.ssafy.c106.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
