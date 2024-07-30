package br.com.pedroacordi.whatsappclone.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {

    @GetMapping("/")
    public ResponseEntity<String> welcomeApiUsers(){
        return new ResponseEntity<>("Welcome to the WhatsApp Clone API", HttpStatus.OK);
    }

}
