package ssafy.modo.jamkkaebi.common.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "Jamkkaebi API Docs",
                description = """
                        <h3>API Reference for Developers</h3>
                        SSAFY 11기 광주 1반 C106 자율 프로젝트 잠깨비 API
                        """,
                version = "v1",
                contact = @Contact(
                        name = "송준혁",
                        email = "fprhqkrtk303@naver.com"
                )
        )
)
@Configuration
public class SwaggerConfig {

}