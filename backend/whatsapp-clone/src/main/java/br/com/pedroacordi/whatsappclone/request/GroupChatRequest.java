package br.com.pedroacordi.whatsappclone.request;

import java.util.List;

public class GroupChatRequest {

    private List<Long> userIds;
    private String chatName;
    private String chatImage;

    private Long creatorUserId;

    public GroupChatRequest() {
    }

    public GroupChatRequest(List<Long> userIds, String chatName, String chatImage) {
        this.userIds = userIds;
        this.chatName = chatName;
        this.chatImage = chatImage;
    }

    public List<Long> getUserIds() {
        return userIds;
    }

    public void setUserIds(List<Long> userIds) {
        this.userIds = userIds;
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

    public Long getCreatorUserId() {
        return creatorUserId;
    }

    public void setCreatorUserId(Long creatorUserId) {
        this.creatorUserId = creatorUserId;
    }
}
