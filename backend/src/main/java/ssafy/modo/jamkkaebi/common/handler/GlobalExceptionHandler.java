package ssafy.modo.jamkkaebi.common.handler;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import ssafy.modo.jamkkaebi.common.ApiResponse;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenExpirationException;
import ssafy.modo.jamkkaebi.common.security.jwt.exception.TokenTypeException;
import ssafy.modo.jamkkaebi.common.tmap.exception.InvalidAddressException;
import ssafy.modo.jamkkaebi.common.tmap.exception.RouteSerializationException;
import ssafy.modo.jamkkaebi.domain.manager.exception.DriverConflictException;
import ssafy.modo.jamkkaebi.domain.member.exception.DriverNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.exception.DuplicatedNameException;
import ssafy.modo.jamkkaebi.domain.member.exception.ManagerNotFoundException;
import ssafy.modo.jamkkaebi.domain.member.exception.UserNotFoundException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    // Spring Exception
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Void>> handleRuntimeException(RuntimeException e) {
        ApiResponse<Void> response = ApiResponse.error(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleUsernameNotFoundException(UsernameNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadCredentialsException(BadCredentialsException e) {
        ApiResponse<Void> response = ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ApiResponse<Void>> handleExpiredJwtException(ExpiredJwtException e) {
        ApiResponse<Void> response = ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(io.jsonwebtoken.security.SignatureException.class)
    public ResponseEntity<ApiResponse<Void>> handleSignatureException(io.jsonwebtoken.security.SignatureException e) {
        ApiResponse<Void> response = ApiResponse.error(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {

        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse<Map<String, String>> response = ApiResponse.error(
                HttpStatus.BAD_REQUEST.value(), "Request body validation error", errors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<List<String>>> handleConstraintViolationException(ConstraintViolationException e) {

        List<String> violations = e.getConstraintViolations()
                .stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .toList();

        ApiResponse<List<String>> response = ApiResponse.error(
                HttpStatus.BAD_REQUEST.value(), "Request body validation error", violations);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiResponse<Void>> handleMediaTypeException(HttpMediaTypeNotSupportedException e) {
        ApiResponse<Void> response = ApiResponse.error(
                HttpStatus.UNSUPPORTED_MEDIA_TYPE.value(),
                "Unsupported Media Type: " + ((e.getContentType() != null) ? e.getContentType().getSubtype() : null));
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body(response);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> requestParameterException(MissingServletRequestParameterException e) {
        ApiResponse<Void> response = ApiResponse.error(
                HttpStatus.BAD_REQUEST.value(),
                "Missing required parameter: " + e.getParameterName());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    // Custom Exception
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleUserNotFoundException(UserNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(TokenTypeException.class)
    public ResponseEntity<ApiResponse<Void>> handleTokenTypeException(TokenTypeException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(TokenExpirationException.class)
    public ResponseEntity<ApiResponse<Void>> handleTokenExpirationException(TokenExpirationException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(DuplicatedNameException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicatedNameException(DuplicatedNameException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(RouteSerializationException.class)
    public ResponseEntity<ApiResponse<Void>> handleRouteSerializationException(RouteSerializationException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(DriverConflictException.class)
    public ResponseEntity<ApiResponse<Void>> handleDriverConflictException(DriverConflictException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(DriverNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleDriverNotFoundException(DriverNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(ManagerNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleManagerNotFoundException(ManagerNotFoundException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }

    @ExceptionHandler(InvalidAddressException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidAddressException(InvalidAddressException e) {
        ApiResponse<Void> response = ApiResponse.error(e.getStatus(), e.getMessage());
        return ResponseEntity.status(e.getStatus()).body(response);
    }
}