package br.com.pedroacordi.whatsappclone.repositories;

import br.com.pedroacordi.whatsappclone.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);

    @Query("SELECT u FROM User u WHERE LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) or LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    public Page<User> findUserByEmailOrUsername(@Param("keyword") String keyword, Pageable pageable);
}
