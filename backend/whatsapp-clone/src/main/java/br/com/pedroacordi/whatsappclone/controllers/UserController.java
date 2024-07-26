package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/")
    public ResponseEntity<User> getUserByToken(@RequestHeader("Authorization") String token){
        User user = service.findUserProfile(token);
        return new ResponseEntity<User>(user, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = service.findUserById(id);
        return new ResponseEntity<User>(user, HttpStatus.OK)
    }

    @GetMapping("/search")
    public ResponseEntity<Page<User>> getUserByNameOrEmail(@RequestParam(name="value") String value, @RequestParam(name="p", defaultValue = "0") int page){
        return ResponseEntity.ok(service.searchUser(value, page));
    }

}
