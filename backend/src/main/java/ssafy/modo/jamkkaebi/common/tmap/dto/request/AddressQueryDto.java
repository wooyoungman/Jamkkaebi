package ssafy.modo.jamkkaebi.common.tmap.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AddressQueryDto {

    private Integer version;
    private String appKey;

    private String fullAddr;

    @JsonProperty("addressFlag")
    private static final String ADDRESS_FLAG = "F02";

    public AddressQueryDto(String address, Integer version, String appKey) {
        this.fullAddr = address;
        this.version = version;
        this.appKey = appKey;
    }
}
