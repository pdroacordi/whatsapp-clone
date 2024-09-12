package br.com.pedroacordi.whatsappclone.security;

import br.com.pedroacordi.whatsappclone.models.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
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

    public static final String JWT_HEADER = "Authorization";

    @Value("${password.secret-key}")
    private static final String SECRET_KEY = "";
    private static final long SECONDS   = 1000;
    private static final long MINUTES    = 60 * SECONDS;
    private static final long HOURS      = 60 * MINUTES;
    private static final long DAYS       = 24 * HOURS;
    public static final long EXPIRATION = 2 * DAYS;

    private static final String ISSUER = "*CompNam*";
    private static final String PREFIX = "Bearer ";

    public static String encode(User user){
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        String jws = Jwts.builder()
                .setIssuedAt(new Date())
                .setSubject(user.getEmail())
                .setIssuer(ISSUER)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        return PREFIX + jws;
    }

    public static Authentication decode(HttpServletRequest request) {
        String token = request.getHeader(JWT_HEADER);

        if(token == null)
            token = request.getParameter(JWT_HEADER);

        if (token == null || !token.startsWith(PREFIX)) {
            return null;
        }

        Jws<Claims> claims = getClaimsFromToken(token);

        String subject = claims.getBody().getSubject();
        String issuer = claims.getBody().getIssuer();
        String authorities = String.valueOf(claims.getBody().get("authorities"));
        Date exp = claims.getBody().getExpiration();
        List<GrantedAuthority> authorityList = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

        return isValidToken(subject, issuer, exp)
                ? new UsernamePasswordAuthenticationToken(subject, null, authorityList)
                : null;
    }

    public static Authentication decodeToken(String token) {

        Jws<Claims> claims = getClaimsFromToken(token);
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

    public static Jws<Claims> getClaimsFromToken(String token){
        token = token.replace(PREFIX, "");
        Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }

    public static String getEmailFromToken(String token){
        Jws<Claims> claims = getClaimsFromToken(token);
        return claims.getBody().getSubject();
    }

}
