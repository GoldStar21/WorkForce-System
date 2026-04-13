package com.workForceSystem.backend.service;

import com.workForceSystem.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    // 1 sat u milisekundama
    private static final long EXPIRATION_TIME = 3600_000;

    private SecretKey getSigningKey() {
        // Generiranje tajnog ključa iz stringa
        return Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
    }

    //  1. Kreiranje Tokena
    public String createToken(UserDetails userDetails) {
        String role = userDetails.getAuthorities().stream()
                .findFirst()
                .map(a -> a.getAuthority())
                .orElse("UNKNOWN");

        return Jwts.builder()
                .claim("username", userDetails.getUsername())
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getSigningKey())
                .compact();
    }

    // 2. Validacija Tokena
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(getSigningKey())
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    //  3. Parsiranje i dohvaćanje Claims-a
    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 4. Dohvaćanje korisničkog imena (koristi JwtFilter)
    public String extractUsername(String token) {
        return parseToken(token).get("username", String.class);
    }
}
