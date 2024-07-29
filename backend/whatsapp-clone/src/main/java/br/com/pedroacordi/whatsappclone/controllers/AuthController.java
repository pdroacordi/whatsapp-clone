package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.response.AuthResponse;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;
import br.com.pedroacordi.whatsappclone.services.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody User user){
        service.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken( user.getEmail(), user.getPassword() );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TokenUtil.encode( user );

        AuthResponse response = new AuthResponse(jwt);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody User user){
        Authentication authentication = service.authenticate( user );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TokenUtil.encode( user );

        AuthResponse response = new AuthResponse(jwt);
        return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
    }

}
