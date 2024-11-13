package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import org.springframework.stereotype.Service;

@Service
public class RoutingKeyService {

    public String routingKeyBuilder(String uuid) {
        return "device." + uuid + ".control";
    }
}
