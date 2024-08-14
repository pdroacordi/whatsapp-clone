package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.Message;
import br.com.pedroacordi.whatsappclone.response.ApiResponse;
import br.com.pedroacordi.whatsappclone.services.chat.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class RealTimeChatController {


    private final SimpMessagingTemplate simpMessagingTemplate;
    private final ChatService chatService;

    public RealTimeChatController(SimpMessagingTemplate simpMessagingTemplate, ChatService chatService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.chatService = chatService;
    }

    @MessageMapping("/message")
    @SendTo("/chat/public")
    public Message receiveMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/chat/"+message.getChat().getId().toString(), message);
        return message;
    }

    @MessageMapping("/chats")
    public void updateChat(@Payload Chat givenChat) {
        Chat chat = chatService.findChatById(givenChat.getId());
        chat.getUsers().forEach(user -> simpMessagingTemplate.convertAndSendToUser(
                user.getId().toString(),
                "/queue",
                new ApiResponse("update the chat", true)));
    }

}
