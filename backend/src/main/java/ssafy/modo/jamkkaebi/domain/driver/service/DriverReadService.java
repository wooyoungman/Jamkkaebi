package ssafy.modo.jamkkaebi.domain.driver.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DriverReadService {
    public String getSleepIndex(String type) {
        return "Sleep Index of type " + type;
    }
}
