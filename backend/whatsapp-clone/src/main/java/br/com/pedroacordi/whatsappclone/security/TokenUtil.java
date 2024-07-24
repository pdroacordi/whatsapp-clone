package br.com.pedroacordi.whatsappclone.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import java.io.IOException;
import java.security.Key;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class TokenUtil {

    public static final String JWT_HEADER = "Authorization ";
    public static final String SECRET_KEY = "ais451e2u45112sad20214e332djmqopixlaoiwdoiajx152e6312cxa56s";
    public static final long SECONDS   = 1000;
    public static final long MINUTES    = 60 * SECONDS;
    public static final long HOURS      = 60 * MINUTES;
    public static final long DAYS       = 24 * HOURS;
    public static final long EXPIRATION = 1*DAYS;

    public static final String ISSUER = "*CompNam*";
    public static final String PREFIX = "Bearer ";

    public static Authentication decode(HttpServletRequest request) throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith(PREFIX)) {
            return null;
        }

        token = token.replace(PREFIX, "");
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);

        String subject = claims.getBody().getSubject();
        String issuer = claims.getBody().getIssuer();
        String authorities = String.valueOf(claims.getBody().get("authorities"));
        Date exp = claims.getBody().getExpiration();
        List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

        return isValidToken(subject, issuer, exp)
                ? new UsernamePasswordAuthenticationToken(subject, null, authorityList)
                : null;
    }

    public static boolean isValidToken(String subject, String issuer, Date exp){
        return subject != null && !subject.isEmpty() && issuer.equals(ISSUER) && exp.after(new Date(System.currentTimeMillis()));
    }

}
