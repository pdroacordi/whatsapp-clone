package br.com.pedroacordi.whatsappclone.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;

import java.util.Map;

public class HttpHandshakeInterceptor implements HandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (!(request instanceof ServletServerHttpRequest)) {
            return true;
        }
        ServletServerHttpRequest servletRequest = (ServletServerHttpRequest) request;
        String token = servletRequest.getServletRequest().getParameter("token");
        Authentication auth = TokenUtil.decodeToken(token);
        if (auth != null) {
            SecurityContextHolder.getContext().setAuthentication(auth);
        } else {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        SecurityContextHolder.clearContext();
    }
}
