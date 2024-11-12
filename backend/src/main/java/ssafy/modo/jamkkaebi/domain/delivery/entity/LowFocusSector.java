package ssafy.modo.jamkkaebi.domain.delivery.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "low_focus_sectors")
public class LowFocusSector {

    @Id
    private String id;
    private Long deliveryId;
    private List<SectorInfo> sectorInfo;
}
