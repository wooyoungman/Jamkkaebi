package ssafy.modo.jamkkaebi.common.util;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class HealthCheckUtil {

    private final Map<String, CompletableFuture<Boolean>> pendingRequests = new ConcurrentHashMap<>();

    public CompletableFuture<Boolean> createFuture(String uuid) {
        CompletableFuture<Boolean> future = new CompletableFuture<>();
        pendingRequests.put(uuid, future);
        return future;
    }

    public void completeFuture(String uuid, boolean result) {
        CompletableFuture<Boolean> future = pendingRequests.remove(uuid);
        if (future != null) {
            future.complete(result);
        }
    }

    public void timeoutFuture(String uuid) {
        CompletableFuture<Boolean> future = pendingRequests.remove(uuid);
        if (future != null) {
            future.complete(false);
        }
    }
}
