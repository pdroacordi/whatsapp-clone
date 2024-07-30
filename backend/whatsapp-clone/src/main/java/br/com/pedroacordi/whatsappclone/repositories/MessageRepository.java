package br.com.pedroacordi.whatsappclone.repositories;

import br.com.pedroacordi.whatsappclone.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m INNER JOIN m.chat c WHERE c.id = :chatId")
    public List<Message> findByChatId(@Param("chatId") Long chatId);

}
