package ssafy.modo.jamkkaebi.common.tmap.dto;

import lombok.Data;

@Data
public class AddressQueryDto {

    private Integer version;
    private String appKey;

    private String fullAddr;

    private static final String addressFlag = "F02";

    public AddressQueryDto(String address, Integer version, String appKey) {
        this.fullAddr = address;
        this.version = version;
        this.appKey = appKey;
    }
}
