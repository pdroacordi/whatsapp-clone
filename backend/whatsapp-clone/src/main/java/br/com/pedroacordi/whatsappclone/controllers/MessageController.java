package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.Message;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.request.SendMessageRequest;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;
import br.com.pedroacordi.whatsappclone.services.message.MessageService;
import br.com.pedroacordi.whatsappclone.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Message> sendMessage(@RequestBody SendMessageRequest request,
                                               @RequestHeader(TokenUtil.JWT_HEADER) String jwt){
        User user = userService.findUserProfile( jwt );
        request.setUserId(user.getId());
        Message message = messageService.sendMessage(request);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/chats/{id}")
    public ResponseEntity<List<Message>> getChatMessages(@PathVariable("id") Long id,
                                                         @RequestHeader(TokenUtil.JWT_HEADER) String jwt){
        User user = userService.findUserProfile( jwt );
        return new ResponseEntity<>( messageService.getChatMessages( id, user ) , HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Message> getMessageByID(@PathVariable("id") Long id){
        return new ResponseEntity<>( messageService.findMessageById( id ) , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") Long id,
                                           @RequestHeader(TokenUtil.JWT_HEADER) String jwt){
        User user = userService.findUserProfile( jwt );
        messageService.deleteMessage(id, user);
        return new ResponseEntity<>( HttpStatus.NO_CONTENT );
    }

}
