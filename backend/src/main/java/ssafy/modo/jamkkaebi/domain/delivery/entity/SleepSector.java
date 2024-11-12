package ssafy.modo.jamkkaebi.domain.delivery.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "sleep_sectors")
public class SleepSector {

    @Id
    private String id;
    private Long deliveryId;
    private List<SectorInfo> sectorInfo;
}
