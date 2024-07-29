package br.com.pedroacordi.whatsappclone.services.auth;

import br.com.pedroacordi.whatsappclone.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface IAuthService extends UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException;
    public User create(User user);

}
