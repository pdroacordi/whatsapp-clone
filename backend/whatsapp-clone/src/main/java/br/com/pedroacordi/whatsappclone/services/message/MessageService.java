package br.com.pedroacordi.whatsappclone.services.message;

import br.com.pedroacordi.whatsappclone.exceptions.MessageException;
import br.com.pedroacordi.whatsappclone.exceptions.UserException;
import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.Message;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.repositories.MessageRepository;
import br.com.pedroacordi.whatsappclone.request.SendMessageRequest;
import br.com.pedroacordi.whatsappclone.services.chat.ChatService;
import br.com.pedroacordi.whatsappclone.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MessageService implements IMessageService{

    @Autowired
    private MessageRepository repository;

    @Autowired
    private ChatService chatService;
    @Autowired
    private UserService userService;

    @Override
    public Message sendMessage(SendMessageRequest request) {

        User user = userService.findUserById( request.getUserId() );
        Chat chat = chatService.findChatById( request.getChatId() );

        Message message = new Message();
        message.setChat( chat );
        message.setUser( user );
        message.setContent( request.getContent() );
        message.setTimestamp(LocalDateTime.now());

        return message;
    }

    @Override
    public List<Message> getChatMessages(Long chatId, User reqUser) {
        Chat chat = chatService.findChatById( chatId );

        if( !chat.getUsers().contains( reqUser ) )
            throw new UserException( "The given user is not related to this chat" );

        return repository.findByChatId( chat.getId() );
    }

    @Override
    public Message findMessageById(Long id) {
        Message message = repository.findById( id ).orElse(null);
        if(message == null)
            throw new NoSuchElementException("No message found with given id");
        return message;
    }

    @Override
    public void deleteMessage(Long id, User reqUser) {
        Message message = findMessageById( id );
        if( !message.getUser().equals( reqUser ) )
            throw new MessageException("The given user is not allowed to delete this message");
        repository.delete( message );
    }
}
