package ssafy.modo.jamkkaebi.common.websocket.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class CustomHandshakeInterceptor implements HandshakeInterceptor {

    String BASE_URL = WebSocketConfig.BASE_PATH;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) {

        String path = request.getURI().getPath();

        try {
            String variablePart = path.substring(BASE_URL.length());
            attributes.put("pathVariable", variablePart);
            return true;
        } catch (StringIndexOutOfBoundsException e) {
            response.setStatusCode(HttpStatus.BAD_REQUEST);
            return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
                               WebSocketHandler wsHandler, Exception exception) {
    }
}
