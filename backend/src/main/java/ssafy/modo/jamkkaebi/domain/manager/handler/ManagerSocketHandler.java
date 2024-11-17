package ssafy.modo.jamkkaebi.domain.manager.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ssafy.modo.jamkkaebi.common.websocket.handler.SocketMessageHandler;
import ssafy.modo.jamkkaebi.common.websocket.handler.SocketRequestType;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;
import ssafy.modo.jamkkaebi.domain.manager.service.ManagerReadService;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;

import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class ManagerSocketHandler extends TextWebSocketHandler {

    private final SocketMessageHandler socketMessageHandler;
    private final ManagerReadService managerReadService;
    private final DeviceReadService deviceReadService;

    private final Map<WebSocketSession, Set<String>> managerDeviceMap = new HashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Map<String, Object> attributes = session.getAttributes();
        String pathVariable = (String) attributes.get("pathVariable");

        log.info("Connected to path: {}", pathVariable);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws JsonProcessingException {

        JSONObject jsonMessage = socketMessageHandler.buildJsonMessage(message);
        String messageType = socketMessageHandler.getMessageType(jsonMessage);

        if (messageType.equals(SocketRequestType.GET.toString())) {
            Long managerId = ((Number) jsonMessage.get("managerId")).longValue();
            List<Member> managedDrivers = managerReadService.getManagedDrivers(managerId);
            Set<String> deviceSet = new HashSet<>();

            managedDrivers.forEach(driver -> {
                Device device = deviceReadService.getDeviceByDriverId(driver.getId());
                if (device != null && deviceReadService.isDeviceHealthy(device)) {
                    deviceSet.add(device.getUuid());
                }
            });

            managerDeviceMap.put(session, deviceSet);
            log.info("Device list: {}", deviceSet);
        }
    }
}
