package ssafy.modo.jamkkaebi.common.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ErrorControllerImpl implements ErrorController {

    @RequestMapping(path = "/error")
    public void handleError(HttpServletRequest request) throws Throwable {
        if (request.getAttribute("jakarta.servlet.error.exception") != null) {
            throw (Throwable) request.getAttribute("jakarta.servlet.error.exception");
        }
    }
}
