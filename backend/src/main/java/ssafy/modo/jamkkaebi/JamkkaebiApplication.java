package ssafy.modo.jamkkaebi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class JamkkaebiApplication {

	public static void main(String[] args) {
		SpringApplication.run(JamkkaebiApplication.class, args);
	}

}
