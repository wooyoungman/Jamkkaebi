package ssafy.modo.jamkkaebi.common.tmap.exception;

public class RouteSerializationException extends RuntimeException {

    @Override
    public String getMessage() {
        return TmapExceptionMessage.DESERIALIZATION_FAILED.getMessage();
    }

    public int getStatus() {
        return TmapExceptionMessage.DESERIALIZATION_FAILED.getStatus();
    }
}
