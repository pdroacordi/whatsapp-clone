package br.com.pedroacordi.whatsappclone.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="chat")
public class Chat implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "chat_name", nullable = false)
    private String chatName;

    @Column(name= "chat_image", nullable = false)
    private String chatImage;

    @Column(name="is_group")
    private boolean isGroupChat;

    @ManyToOne
    private User createdBy;

    @ManyToMany
    private Set<User> users = new HashSet<>();

    @ManyToMany
    private Set<User> admins = new HashSet<>();

    @OneToMany(mappedBy = "chat")
    @JsonIgnoreProperties("chat")
    private List<Message> messages = new ArrayList<>();

    public Chat() {
    }

    public Chat(Long id, String chatName, String chatImage, boolean isGroupChat, User createdBy, Set<User> users, List<Message> messages) {
        this.id = id;
        this.chatName = chatName;
        this.chatImage = chatImage;
        this.isGroupChat = isGroupChat;
        this.createdBy = createdBy;
        this.users = users;
        this.messages = messages;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getChatName() {
        return chatName;
    }

    public void setChatName(String chatName) {
        this.chatName = chatName;
    }

    public String getChatImage() {
        return chatImage;
    }

    public void setChatImage(String chatImage) {
        this.chatImage = chatImage;
    }

    public boolean isGroupChat() {
        return isGroupChat;
    }

    public void setGroupChat(boolean groupChat) {
        isGroupChat = groupChat;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public Set<User> getAdmins() {
        return admins;
    }

    public void setAdmins(Set<User> admins) {
        this.admins = admins;
    }
}
