package ssafy.modo.jamkkaebi.domain.manager.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.minidev.json.JSONObject;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ssafy.modo.jamkkaebi.common.websocket.handler.SocketMessageHandler;
import ssafy.modo.jamkkaebi.common.websocket.handler.SocketRequestType;
import ssafy.modo.jamkkaebi.common.websocket.service.SocketSubscriberService;
import ssafy.modo.jamkkaebi.domain.device.dto.response.DeviceDataResponseDto;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;
import ssafy.modo.jamkkaebi.domain.manager.service.ManagerReadService;
import ssafy.modo.jamkkaebi.domain.member.entity.Member;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentMap;

@Slf4j
@Component
@RequiredArgsConstructor
public class ManagerSocketHandler extends TextWebSocketHandler {

    private final SocketMessageHandler socketMessageHandler;
    private final ManagerReadService managerReadService;
    private final DeviceReadService deviceReadService;
    private final ObjectMapper objectMapper;
    private final SocketSubscriberService socketSubscriberService;

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
            log.info("Manager device list: {}", deviceSet);
        }
    }

    @Scheduled(fixedRate = 2000)
    public void broadcastToManagerConsole() {

        if (managerDeviceMap.isEmpty()) {
            log.debug("No managers are connected, not sending data.");
            return;
        }

        ConcurrentMap<String, DeviceDataResponseDto> deviceDataMap = socketSubscriberService.getDeviceDataMap();

        if (!deviceDataMap.isEmpty()) {
            for (Map.Entry<WebSocketSession, Set<String>> entry : managerDeviceMap.entrySet()) {
                WebSocketSession managerSession = entry.getKey();
                Set<String> assignedDevices = entry.getValue();

                List<DeviceDataResponseDto> deviceDataResponses = assignedDevices.stream()
                        .map(deviceDataMap::get)
                        .filter(Objects::nonNull)
                        .toList();

                if (!deviceDataResponses.isEmpty()) {
                    try {
                        Map<String, Object> aggregatedData = new HashMap<>();
                        aggregatedData.put("count", deviceDataResponses.size());
                        aggregatedData.put("data", deviceDataResponses);

                        String message = objectMapper.writeValueAsString(aggregatedData);

                        synchronized (managerSession) {
                            if (managerSession.isOpen()) {
                                managerSession.sendMessage(new TextMessage(message));
                                log.info("Sent data to manager {}", managerSession.getId());
                            }
                        }
                    } catch (JsonProcessingException e) {
                        log.error("Error parsing device data: ", e);
                    } catch (IOException e) {
                        log.error("Error broadcasting data to manager {}", managerSession.getId(), e);
                    }
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.debug("Closed websocket connection for manager: {}", session);
        managerDeviceMap.remove(session);
    }
}
