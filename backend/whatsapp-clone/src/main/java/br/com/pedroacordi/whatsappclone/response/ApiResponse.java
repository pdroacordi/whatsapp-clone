package br.com.pedroacordi.whatsappclone.response;

public class ApiResponse {

    private String message;
    private boolean status;

    public ApiResponse(String message, boolean status) {
        this.message = message;
        this.status = status;
    }
}
