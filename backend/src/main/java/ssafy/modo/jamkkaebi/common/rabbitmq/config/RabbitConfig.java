package ssafy.modo.jamkkaebi.common.rabbitmq.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class RabbitConfig {

    @Bean
    public AnonymousQueue anonymousQueue() {
        return new AnonymousQueue();
    }

    // TODO: MQTT 프로토콜 기본 Exchange를 x-consistent-hash 이용한 Exchange로 변경하기
    @Bean
    public Exchange deviceDataExchange() {
        Map<String, Object> args = new HashMap<>();
        args.put("hash-header", "deviceId");
        return new CustomExchange("device_data_exchange", "x-consistent-hash", true, false, args);
    }

    @Bean
    public Binding binding(AnonymousQueue autoDeleteQueue) {
        return BindingBuilder.bind(autoDeleteQueue).to(new TopicExchange("amq.topic"))
                .with("device.#.data");
    }
}
