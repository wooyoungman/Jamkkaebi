package ssafy.modo.jamkkaebi.domain.device.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.modo.jamkkaebi.domain.device.entity.Device;

public interface DeviceRepository extends JpaRepository<Device, String> {
}
