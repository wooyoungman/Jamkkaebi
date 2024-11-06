package ssafy.modo.jamkkaebi.common.tmap.exception;

public class RouteSerializationException extends RuntimeException {

    public String getMessage() {
        return TmapExceptionMessage.DESERIALIZATION_FAILED.getMessage();
    }

    public int getStatus() {
        return TmapExceptionMessage.DESERIALIZATION_FAILED.getStatus();
    }
}
