package ssafy.modo.jamkkaebi.common.websocket.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;

@Component
@RequiredArgsConstructor
public class SocketMessageHandler {

    private final ObjectMapper objectMapper;

    public JSONObject buildJsonMessage(TextMessage message) throws JsonProcessingException {
        return objectMapper.readValue(message.getPayload(), JSONObject.class);
    }

    public String getMessageType(JSONObject message) {
        return message.get("type").toString();
    }
}
