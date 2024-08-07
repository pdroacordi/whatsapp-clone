package br.com.pedroacordi.whatsappclone.services.user;

import br.com.pedroacordi.whatsappclone.exceptions.UserException;
import br.com.pedroacordi.whatsappclone.models.User;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IUserService {

    public User findUserById(Long id);

    public User findUserProfile(String jwt);

    public User update(User user) throws UserException;

    public Page<User> searchUser(String name, User requestingUser, int page);

}
