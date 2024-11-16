package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import ssafy.modo.jamkkaebi.common.util.HealthCheckUtil;
import ssafy.modo.jamkkaebi.domain.device.service.DeviceReadService;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class RabbitReceiveService {

    private final HealthCheckUtil healthCheckUtil;
    private final DeviceReadService deviceReadService;

    @RabbitListener(queues = "#{anonymousQueue.name}")
    public void handleDeviceDataStream(Message message) throws IOException {

        String uuid = extractUuidFromRoutingKey(getRoutingKey(message));
        log.debug("Received device data from queue {} (device: {})",
                message.getMessageProperties().getConsumerQueue(), uuid);

        deviceReadService.handleDeviceData(uuid, message.getBody());
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue,
            exchange = @Exchange(value = "amq.topic", type = ExchangeTypes.TOPIC),
            key = "device.#.status"
    ))
    public void deviceHealthCheck(Message message) {

        String payload = new String(message.getBody());

        if (payload.equals("HEALTHY")) {
            String routingKey = getRoutingKey(message);
            String uuid = extractUuidFromRoutingKey(routingKey);
            log.debug("Received {} from device {}", payload, uuid);

            healthCheckUtil.completeFuture(uuid, true);
        }
    }

    private String getRoutingKey(Message message) {
        return message.getMessageProperties().getReceivedRoutingKey();
    }

    private String extractUuidFromRoutingKey(String routingKey) {
        String[] parts = routingKey.split("\\.");
        log.debug("Routing key parts: {}", (Object) parts);
        return parts.length > 1 ? parts[1] : null;
    }
}
