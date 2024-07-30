package br.com.pedroacordi.whatsappclone.services.chat;

import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.request.GroupChatRequest;

import java.util.List;

public interface IChatService {

    public Chat createChat(Long requestingUser, Long receiverUser);

    public Chat findChatById(Long chatId);

    public List<Chat> findAllChatByUserId(Long userId);

    public Chat createGroupChat(GroupChatRequest request);

    public Chat addUserToGroup(Long userId, Long chatId, Long reqUserId);

    public Chat renameGroupChat(Long chatId, String newName, Long requestUserId);

    public Chat removeFromGroupChat(Long chatId, Long userId, Long requestUserId);

    public void deleteChat(Long chatId, Long userId);

}
