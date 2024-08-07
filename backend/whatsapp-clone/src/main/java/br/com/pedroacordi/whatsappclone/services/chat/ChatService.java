package br.com.pedroacordi.whatsappclone.services.chat;

import br.com.pedroacordi.whatsappclone.exceptions.ChatException;
import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.repositories.ChatRepository;
import br.com.pedroacordi.whatsappclone.request.GroupChatRequest;
import br.com.pedroacordi.whatsappclone.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class ChatService implements IChatService{

    @Autowired
    private ChatRepository repository;

    @Autowired
    private UserService userService;


    @Override
    public Chat createChat(Long requestingUser, Long receiverUser) {
        User reqUser = userService.findUserById(requestingUser);
        User recUser = userService.findUserById(receiverUser);

        Chat existingChat = repository.findSingleChatByUserIds( reqUser, recUser );

        if(existingChat != null)
            return existingChat;

        Chat newChat = new Chat();
        newChat.setCreatedBy( reqUser );
        newChat.getUsers().add(reqUser);
        newChat.getUsers().add(recUser);
        newChat.setGroupChat(false);


        return repository.save(newChat);
    }

    @Override
    public Chat findChatById(Long chatId) {
        Chat chat = repository.findById(chatId).orElse(null);
        if(chat == null)
            throw new NoSuchElementException("No chat found with the given id");
        return chat;
    }

    @Override
    public List<Chat> findAllChatByUserId(Long userId) {
        User user = userService.findUserById(userId);
        return repository.findChatByUserId( user.getId() );
    }

    @Override
    public Chat createGroupChat(GroupChatRequest request) {

        User creator = userService.findUserById( request.getCreatorUserId() );

        Chat groupChat = new Chat();
        groupChat.setGroupChat(true);
        groupChat.setChatImage(request.getChatImage());
        groupChat.setChatName(request.getChatName());
        groupChat.setCreatedBy( creator );
        groupChat.getAdmins().add(creator);
        List<User> users = request.getUserIds().stream()
                .map(userService::findUserById)
                .toList();

        groupChat.getUsers().addAll(users);
        return repository.save(groupChat);
    }

    @Override
    public Chat addUserToGroup(Long userId, Long chatId, Long reqUserId) {

        Chat chat = this.findChatById(chatId);
        User user = userService.findUserById(userId);
        User reqUser = userService.findUserById(reqUserId);

        if(!chat.getAdmins().contains(reqUser))
            throw new ChatException("The user is unable to perform the action, for it is not an admin");

        chat.getUsers().add(user);

        return repository.save(chat);
    }

    @Override
    public Chat renameGroupChat(Long chatId, String newName, Long requestUserId) {
        Chat chat = this.findChatById(chatId);
        User reqUser = userService.findUserById(requestUserId);

        if(!chat.getAdmins().contains(reqUser))
            throw new ChatException("The user is unable to perform the action, for it is not an admin");

        newName = newName.trim();

        if( newName.length() > 50 )
            throw new ChatException("The given name is over 50 characters");
        if( newName.isEmpty() )
            throw new ChatException("The given name is invalid");
        chat.setChatName(newName);

        return repository.save(chat);
    }

    @Override
    public Chat removeFromGroupChat(Long chatId, Long userId, Long requestUserId) {
        Chat chat = this.findChatById(chatId);
        User reqUser = userService.findUserById(requestUserId);
        User recUser = userService.findUserById(userId);

        if( reqUser.equals( recUser ) ){ //In this situation, the member is trying to leave the group chat
            chat.getUsers().remove(recUser);
            chat.getAdmins().remove(recUser);
            return repository.save(chat);
        }

        if(!chat.getAdmins().contains(reqUser))
            throw new ChatException("The user is unable to perform the action, for it is not an admin");

        if(!chat.getUsers().contains(recUser))
            throw new ChatException("The user you are trying to remove is not a current member of the group chat");

        if( chat.getAdmins().contains(recUser) && !chat.getCreatedBy().equals( reqUser ) )
            throw new ChatException("Only the creator of the group can remove an admin");

        chat.getAdmins().remove(recUser);
        chat.getUsers().remove(recUser);

        return repository.save(chat);
    }

    @Override
    public void deleteChat(Long chatId, Long userId) {
        Chat chat = this.findChatById(chatId);
        User reqUser = userService.findUserById(userId);

        if( !chat.getCreatedBy().equals( reqUser ) )
            throw new ChatException("Only the creator of the group can perform this action");

        repository.delete( chat );
    }

}
