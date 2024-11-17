package ssafy.modo.jamkkaebi.common.websocket.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import ssafy.modo.jamkkaebi.domain.driver.handler.DriverSocketHandler;
import ssafy.modo.jamkkaebi.domain.manager.handler.ManagerSocketHandler;

@Configuration
@EnableWebSocket
@EnableScheduling
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    public static final String BASE_PATH = "/ws/v1";

    private final ManagerSocketHandler managerSocketHandler;
    private final DriverSocketHandler driverSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        registry.addHandler(managerSocketHandler, BASE_PATH + "/manager")
                .addHandler(driverSocketHandler, BASE_PATH + "/driver")
                .addInterceptors(new CustomHandshakeInterceptor())
                .setAllowedOrigins("*");
    }
}