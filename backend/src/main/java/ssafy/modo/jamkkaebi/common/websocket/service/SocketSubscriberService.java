package ssafy.modo.jamkkaebi.common.websocket.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SocketSubscriberService {

    private final Map<WebSocketSession, String> deviceSubscriber = new ConcurrentHashMap<>();

    public void putToMap(WebSocketSession session, String deviceId) {

        if (!deviceSubscriber.containsKey(session)) {
            deviceSubscriber.put(session, deviceId);

            log.info("Session {} has been put to map with key {}", session.getId(), deviceId);
            log.info("Subscribers of device {}: {}", deviceId,
                    getKeysByValue(deviceSubscriber, deviceId).stream().map(WebSocketSession::getId).toList());
        } else {
            log.info("Session {} is already in the map", session.getId());
        }
    }

    public void removeFromMap(WebSocketSession session) {
        deviceSubscriber.remove(session);
        log.info("Session {} has been removed from map", session.getId());
        log.info("Subscribers: {}", deviceSubscriber.keySet().stream().map(WebSocketSession::getId).toList());
    }

    public Set<WebSocketSession> getSubscribersByDeviceId(String deviceId) {
        return getKeysByValue(deviceSubscriber, deviceId);
    }

    private static <T, E> Set<T> getKeysByValue(Map<T, E> map, E value) {
        return map.entrySet()
                .stream()
                .filter(entry -> Objects.equals(entry.getValue(), value))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());
    }
}