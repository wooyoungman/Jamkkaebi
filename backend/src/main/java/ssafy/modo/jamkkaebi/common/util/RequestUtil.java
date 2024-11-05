package ssafy.modo.jamkkaebi.common.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class RequestUtil {

    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    private HttpHeaders createHeaders(Map<String, String> properties) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        if (properties != null) {
            properties.forEach(headers::set);
        }

        return headers;
    }

    private <T> HttpEntity<String> createRequestEntity(T requestDto, Map<String, String> additionalHeaders)
            throws JsonProcessingException {

        HttpHeaders headers = createHeaders(additionalHeaders);
        if (requestDto == null) {
            return new HttpEntity<>(headers);
        }
        String jsonBody = objectMapper.writeValueAsString(requestDto);
        return new HttpEntity<>(jsonBody, headers);
    }

    private <R> ResponseEntity<R> executeRequest(
            HttpMethod method, String url, HttpEntity<String> requestEntity, Class<R> responseType) {

        try {
            return restTemplate.exchange(url, method, requestEntity, responseType);
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new RuntimeException("HTTP error: " + e.getStatusCode() + " - " + e.getResponseBodyAsString(), e);
        } catch (ResourceAccessException e) {
            throw new RuntimeException("Resource access error: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Unexpected error: " + e.getMessage(), e);
        }
    }

    public <T, R> ResponseEntity<R> sendRequest(
            HttpMethod method, String url, T requestDto, Class<R> responseType, Map<String, String> headers)
            throws JsonProcessingException {

        HttpEntity<String> requestEntity = createRequestEntity(requestDto, headers);
        return executeRequest(method, url, requestEntity, responseType);
    }

    public <R> ResponseEntity<R> sendRequest(
            HttpMethod method, String url, Class<R> responseType, Map<String, String> headers)
            throws JsonProcessingException {

        HttpEntity<String> requestEntity = createRequestEntity(null, headers);
        return executeRequest(method, url, requestEntity, responseType);
    }
}
