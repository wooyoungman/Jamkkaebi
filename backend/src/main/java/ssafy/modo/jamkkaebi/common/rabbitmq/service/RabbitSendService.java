package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RabbitSendService {

    private final ObjectMapper objectMapper;
    private final RabbitTemplate rabbitTemplate;
    private final RoutingKeyService routingKeyService;

    public void sendCommandToDevice(String uuid, Object dto) throws JsonProcessingException {

        String routingKey = routingKeyService.controlRoutingKeyBuilder(uuid);
        String message = objectMapper.writeValueAsString(dto);

        rabbitTemplate.convertAndSend("amq.topic", routingKey, message);
    }
}
