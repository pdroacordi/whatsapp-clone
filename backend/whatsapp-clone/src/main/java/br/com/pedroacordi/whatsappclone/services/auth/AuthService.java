package br.com.pedroacordi.whatsappclone.services.auth;

import br.com.pedroacordi.whatsappclone.exceptions.UserException;
import br.com.pedroacordi.whatsappclone.models.User;
import br.com.pedroacordi.whatsappclone.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthService implements IAuthService{

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Override
    public User create(User user) {
        if(user.getFullName() == null || user.getEmail() == null || user.getPassword() == null)
            throw new UserException("Missing information");

        if(user.getFullName().isEmpty() || user.getEmail().isEmpty() || user.getPassword().isEmpty() )
            throw new UserException("Missing information");

        user.setEmail( user.getEmail().trim() );

        if( userRepository.findByEmail( user.getEmail() ) != null )
            throw new UserException("The given email is already taken by another user.");

        user.setPassword( encoder.encode(user.getPassword()) );

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);
        if(user == null)
            throw new UsernameNotFoundException("No user found with the given email");

        List<GrantedAuthority> authorityList = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorityList);
    }

    public Authentication authenticate(User user){
        UserDetails userDetails = loadUserByUsername( user.getEmail() );

        if( userDetails == null )
            throw new BadCredentialsException("Invalid email");

        if( !encoder.matches( user.getPassword(), userDetails.getPassword() ) )
            throw new BadCredentialsException("Invalid password");

        return new UsernamePasswordAuthenticationToken( userDetails, null, userDetails.getAuthorities() );

    }
}
