package br.com.pedroacordi.whatsappclone.services.message;

import br.com.pedroacordi.whatsappclone.models.Message;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.request.SendMessageRequest;

import java.util.List;

public interface IMessageService {

    public Message sendMessage(SendMessageRequest request);

    public List<Message> getChatMessages(Long chatId, User reqUser);

    public Message findMessageById(Long id);

    public void deleteMessage(Long id, User reqUser);


}
