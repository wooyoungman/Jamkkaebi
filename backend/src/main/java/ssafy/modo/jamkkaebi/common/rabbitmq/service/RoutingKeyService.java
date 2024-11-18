package ssafy.modo.jamkkaebi.common.rabbitmq.service;

import org.springframework.stereotype.Service;

@Service
public class RoutingKeyService {

    public String controlRoutingKeyBuilder(String uuid) {
        return "device." + uuid + ".control";
    }

    public String statusRoutingKeyBuilder(String uuid) {
        return "device." + uuid + ".status";
    }
}
