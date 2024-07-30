package br.com.pedroacordi.whatsappclone.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String content;

    private LocalDateTime timestamp;

    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name="chat_id")
    @JsonIgnoreProperties("messages")
    private Chat chat;

    public Message() {
    }

    public Message(long id, String content, LocalDateTime timestamp, User user, Chat chat) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.user = user;
        this.chat = chat;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Chat getChat() {
        return chat;
    }

    public void setChat(Chat chat) {
        this.chat = chat;
    }
}
