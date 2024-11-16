package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import ssafy.modo.jamkkaebi.common.util.HealthCheckUtil;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Slf4j
@Service
@RequiredArgsConstructor
public class RabbitSendService {

    private final ObjectMapper objectMapper;
    private final RabbitTemplate rabbitTemplate;
    private final RoutingKeyService routingKeyService;
    private final HealthCheckUtil healthCheckUtil;

    public void sendCommandToDevice(String uuid, Object dto) throws JsonProcessingException {

        String routingKey = routingKeyService.controlRoutingKeyBuilder(uuid);
        String message = objectMapper.writeValueAsString(dto);

        rabbitTemplate.convertAndSend("amq.topic", routingKey, message);
    }

    public boolean sendHealthCheckToDevice(String uuid) {

        String routingKey = routingKeyService.statusRoutingKeyBuilder(uuid);
        CompletableFuture<Boolean> future = healthCheckUtil.createFuture(uuid);

        try {
            rabbitTemplate.convertAndSend("amq.topic", routingKey, "HEALTH_CHECK");
            return future.get(3, TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            healthCheckUtil.timeoutFuture(uuid);
            log.debug("Device {} health check timeout", uuid);
            return false;
        } catch (InterruptedException | ExecutionException e) {
            Thread.currentThread().interrupt();
            return false;
        } finally {
            healthCheckUtil.timeoutFuture(uuid);
        }
    }
}
