package br.com.pedroacordi.whatsappclone.request;

public class PrivateChatRequest {

    private Long reqUserId;
    private Long recUserId;

    public PrivateChatRequest() {
    }

    public Long getReqUserId() {
        return reqUserId;
    }

    public void setReqUserId(Long reqUserId) {
        this.reqUserId = reqUserId;
    }

    public Long getRecUserId() {
        return recUserId;
    }

    public void setRecUserId(Long recUserId) {
        this.recUserId = recUserId;
    }
}
