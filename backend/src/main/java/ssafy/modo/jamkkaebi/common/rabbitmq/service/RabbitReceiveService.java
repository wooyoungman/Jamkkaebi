package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.ExchangeTypes;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RabbitReceiveService {

    private final Binding binding;

    @RabbitListener(queues = {"#{anonymousQueue.name}"})
    public void logMessage(String message) {
        log.debug("Message received from key {}: {}", binding.getRoutingKey(), message);
    }

    @RabbitListener(bindings = @QueueBinding(
            value = @Queue,
            exchange = @Exchange(value = "amq.topic", type = ExchangeTypes.TOPIC),
            key = "device.#.status"
    ))
    public boolean deviceHealthCheck(Message message) {
        String routingKey = message.getMessageProperties().getReceivedRoutingKey();
        return extractUuidFromRoutingKey(routingKey) != null;
    }

    private String extractUuidFromRoutingKey(String routingKey) {
        String[] parts = routingKey.split("\\.");
        log.info("Routing key parts: {}", (Object) parts);
        return parts.length > 1 ? parts[1] : null;
    }
}
