package ssafy.modo.jamkkaebi.common.websocket.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SocketSubscriberService {

    private final Map<String, String> deviceSubscriber = new ConcurrentHashMap<>();

    public void putToMap(String sessionId, String deviceId) {

        if (!deviceSubscriber.containsKey(sessionId)) {
            deviceSubscriber.put(sessionId, deviceId);

            log.debug("Session {} has been put to map with key {}", sessionId, deviceId);
            log.debug("Total subscribers of device {}: {}", deviceId,
                    getSubscriberByDeviceId(deviceSubscriber, deviceId));
        } else {
            log.debug("Session {} is already in the map", sessionId);
        }
    }

    public void removeFromMap(String sessionId) {
        deviceSubscriber.remove(sessionId);
        log.debug("Session {} has been removed from map", sessionId);
        log.debug("Total subscribers: {}", deviceSubscriber.entrySet().stream().map(Map.Entry::getValue).toList());
    }

    private static <T, E> Set<T> getSubscriberByDeviceId(Map<T, E> map, E uuid) {
        return map.entrySet()
                .stream()
                .filter(entry -> Objects.equals(entry.getValue(), uuid))
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());
    }
}
