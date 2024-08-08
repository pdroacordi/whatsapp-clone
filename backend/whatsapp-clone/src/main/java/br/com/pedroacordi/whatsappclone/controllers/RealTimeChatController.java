package br.com.pedroacordi.whatsappclone.controllers;

import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;

public class RealTimeChatController {

    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/message")
    @SendTo("/chat/public")
    public Message receiveGroupMessage(@Payload Message message){
        simpMessagingTemplate.convertAndSend("/chat/"+message.getChat().getId().toString(), message);
        return message;
    }

    @MessageMapping("/chats")
    @SendTo("/chat/public")
    public void updateChat(@Payload Chat chat) {
        simpMessagingTemplate.convertAndSend("/chat/update", chat);
    }

}
