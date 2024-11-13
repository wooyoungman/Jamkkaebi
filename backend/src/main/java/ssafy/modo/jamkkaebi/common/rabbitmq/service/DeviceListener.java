package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DeviceListener {

    @RabbitListener(queues = {"#{anonymousQueue.name}"})
    public void handleMessage(String message) {
        log.info("Message received: {}", message);
    }
}
