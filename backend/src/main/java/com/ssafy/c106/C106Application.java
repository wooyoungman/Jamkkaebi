package com.ssafy.c106;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class C106Application {

	public static void main(String[] args) {
		SpringApplication.run(C106Application.class, args);
	}

}
