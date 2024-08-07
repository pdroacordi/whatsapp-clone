package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.response.ApiResponse;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;
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
    public ResponseEntity<User> getUserByToken(@RequestHeader(TokenUtil.JWT_HEADER) String token){
        User user = service.findUserProfile(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = service.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<User>> getUserByNameOrEmail(@RequestParam(name="value") String value,
                                                           @RequestParam(name="p", defaultValue = "0") int page,
                                                           @RequestHeader(TokenUtil.JWT_HEADER) String token){
        User user = service.findUserProfile(token);
        return ResponseEntity.ok(service.searchUser(value, user, page));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user){
        user.setId(id);
        return new ResponseEntity<>( service.update(user), HttpStatus.OK );
    }

}
