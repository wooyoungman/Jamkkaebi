package ssafy.modo.jamkkaebi.domain.driver.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ssafy.modo.jamkkaebi.common.websocket.handler.SocketMessageHandler;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class DriverSocketHandler extends TextWebSocketHandler {

    private final SocketMessageHandler socketMessageHandler;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Map<String, Object> attributes = session.getAttributes();
        String pathVariable = (String) attributes.get("pathVariable");

        log.info("Connected to path: {}", pathVariable);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException {

        JSONObject jsonMessage = socketMessageHandler.buildJsonMessage(message);
    }
}
