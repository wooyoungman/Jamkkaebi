package ssafy.modo.jamkkaebi.common;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {

    private int status;
    private String message;
    private LocalDateTime timestamp;
    private T data;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "Success", LocalDateTime.now(), data);
    }

    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(200, message, LocalDateTime.now(), data);
    }

    public static <T> ApiResponse<T> success(int status, T data, String message) {
        return new ApiResponse<>(status, message, LocalDateTime.now(), data);
    }

    public static <T> ApiResponse<T> success(int status, T data) {
        return new ApiResponse<>(status, "Success", LocalDateTime.now(), data);
    }

    public static <T> ApiResponse<T> error(int status, String message) {
        return new ApiResponse<>(status, message, LocalDateTime.now(), null);
    }

    public static <T> ApiResponse<T> error(int status, String message, T data) {
        return new ApiResponse<>(status, message, LocalDateTime.now(), data);
    }
}
