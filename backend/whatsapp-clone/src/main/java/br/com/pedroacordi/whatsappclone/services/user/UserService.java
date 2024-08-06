package br.com.pedroacordi.whatsappclone.services.user;

import br.com.pedroacordi.whatsappclone.exceptions.JwtException;
import br.com.pedroacordi.whatsappclone.exceptions.UserException;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.repositories.UserRepository;
import br.com.pedroacordi.whatsappclone.security.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository repository;

    private static final int ELEMENTS_PER_PAGE = 10;

    @Override
    public User findUserById(Long id) {
        User user = repository.findById(id).orElse(null);
        if(user == null)
            throw new NoSuchElementException("User not found");
        return user;
    }

    @Override
    public User findUserProfile(String jwt) {
        String email = TokenUtil.getEmailFromToken(jwt);

        if(email == null)
            throw new JwtException("Invalid Token");
        User user  = repository.findByEmail(email);

        if(user == null)
            throw new NoSuchElementException("No users found with the given email");

        return user;
    }

    @Override
    public User update(User user) throws UserException {
        User temp = findUserById(user.getId());

        if(temp == null)
            throw new UserException("Nonexistent user");

        if( !temp.getEmail().equals(user.getEmail() ) )
            temp.setEmail(user.getEmail());

        if( !temp.getFullName().equals(user.getFullName() ) )
            temp.setFullName(user.getFullName());

        if( !temp.getProfilePicture().equals(user.getProfilePicture() ) )
            temp.setProfilePicture(user.getProfilePicture());

        if( !temp.getPassword().equals(user.getPassword() ) )
            temp.setPassword(user.getPassword());


        return repository.save(temp);
    }

    @Override
    public Page<User> searchUser(String name, int page) {

        if( name == null || name.isEmpty() )
            throw new UserException("Invalid search");

        Pageable pageable = PageRequest.of(page, ELEMENTS_PER_PAGE);
        return repository.findUserByEmailOrUsername(name, pageable);
    }
}
