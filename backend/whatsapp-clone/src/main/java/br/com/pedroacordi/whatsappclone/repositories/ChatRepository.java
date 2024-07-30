package br.com.pedroacordi.whatsappclone.repositories;

import br.com.pedroacordi.whatsappclone.models.Chat;
import br.com.pedroacordi.whatsappclone.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT c FROM Chat c JOIN c.users u WHERE u.id = :userId")
    public List<Chat> findChatByUserId(@Param("userId") Long userId);

    @Query( "SELECT c FROM Chat c WHERE c.isGroupChat = FALSE AND :reqUser MEMBER OF c.users AND :recUser MEMBER OF c.users" )
    public Chat findSingleChatByUserIds(@Param("reqUser") User reqUser, @Param("recUser") User recUser );

}
