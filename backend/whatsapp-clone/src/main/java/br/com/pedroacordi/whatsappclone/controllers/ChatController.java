package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.request.GroupChatRequest;
import br.com.pedroacordi.whatsappclone.request.PrivateChatRequest;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;
import br.com.pedroacordi.whatsappclone.services.chat.ChatService;
import br.com.pedroacordi.whatsappclone.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private UserService userService;

    @PostMapping("/private")
    public ResponseEntity<Chat> createPrivateChat(@RequestBody PrivateChatRequest privateChatRequest){
        return new ResponseEntity<>( chatService.createChat( privateChatRequest.getReqUserId(), privateChatRequest.getRecUserId() ), HttpStatus.CREATED );
    }

    @PostMapping("/group")
    public ResponseEntity<Chat> createGroupChat(@RequestBody GroupChatRequest groupChatRequest){
        return new ResponseEntity<>( chatService.createGroupChat( groupChatRequest ), HttpStatus.CREATED );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Chat> findChatById(@PathVariable(name="id") Long id){
        return new ResponseEntity<>( chatService.findChatById(id), HttpStatus.OK );
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<List<Chat>> findAllChatsByUser(@PathVariable(name="id") Long id){
        return new ResponseEntity<>( chatService.findAllChatByUserId(id), HttpStatus.OK );
    }

    @PostMapping("/group/{ìd}/user")
    public ResponseEntity<Chat> addMemberToGroupChat(@PathVariable(name="id") Long groupChatId,
                                                     @RequestParam(name="user") Long userId,
                                                     @RequestHeader(name= TokenUtil.JWT_HEADER) String jwt){
        User requestUser = userService.findUserProfile( jwt );
        return new ResponseEntity<>( chatService.addUserToGroup( userId, groupChatId, requestUser.getId() ), HttpStatus.CREATED );
    }

    @DeleteMapping("/group/{ìd}/user")
    public ResponseEntity<Chat> removeMemberFromGroupChat(@PathVariable(name="id") Long groupChatId,
                                                          @RequestParam(name="user") Long userId,
                                                          @RequestHeader(name= TokenUtil.JWT_HEADER) String jwt){
        User requestUser = userService.findUserProfile( jwt );
        return new ResponseEntity<>( chatService.removeFromGroupChat( groupChatId, userId, requestUser.getId() ), HttpStatus.OK );
    }

    @PutMapping("/group/{ìd}")
    public ResponseEntity<Chat> renameGroupChat(@PathVariable(name="id") Long groupChatId,
                                                @RequestParam(name="name") String newName,
                                                @RequestHeader(name= TokenUtil.JWT_HEADER) String jwt){
        User requestUser = userService.findUserProfile( jwt );
        return new ResponseEntity<>( chatService.renameGroupChat( groupChatId, newName, requestUser.getId() ), HttpStatus.OK );
    }

    @DeleteMapping("/group/{ìd}")
    public ResponseEntity<Chat> deleteGroupChat(@PathVariable(name="id") Long groupChatId,
                                                @RequestHeader(name= TokenUtil.JWT_HEADER) String jwt){
        User requestUser = userService.findUserProfile( jwt );
        chatService.deleteChat(groupChatId, requestUser.getId());
        return new ResponseEntity<>( HttpStatus.NO_CONTENT );
    }

}
