package br.com.pedroacordi.whatsappclone.response;

import java.io.Serializable;

public class ApiResponse implements Serializable {

    private String message;
    private boolean status;

    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
