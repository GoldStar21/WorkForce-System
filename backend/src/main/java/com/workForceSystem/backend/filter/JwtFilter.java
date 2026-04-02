package com.workForceSystem.backend.filter;

import com.workForceSystem.backend.service.CustomUserDetailsService;
import com.workForceSystem.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,  FilterChain filterChain) throws ServletException, java.io.IOException {

        // 1. Skip auth routes (login/register)
        if (request.getServletPath().startsWith("/auth") ||
                request.getServletPath().equals("/employees/set-password")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;

        // Čitanje JWT iz HttpOnly cookie
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        // Validacija tokena i postavljanje Authentication
        if (token != null && jwtService.validateToken(token)) {
            try {
                // 1. Dohvati username iz tokena
                String username = jwtService.extractUsername(token);

                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

                    // 2. Dohvati UserDetails (s lozinkom, ulogama, itd.)
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    // 3. Kreiraj Authentication objekt
                    // Koristimo konstruktor koji uzima authorities, jer je korisnik već autentičan (putem JWT-a)
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null, // Lozinka (credentials) se postavlja na null jer je token već provjeren
                                    userDetails.getAuthorities()
                            );

                    // Opcionalno: Dodaj detalje zahtjeva (npr. IP adresa)
                    // auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    // 4. Postavi Authentication u SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                // Greška prilikom parsiranja, učitavanja korisnika, itd.
                // Logiraj grešku, a filter će ići dalje, ali bez postavljenog konteksta.
                System.err.println("Error processing JWT: " + e.getMessage());
            }
        }

        // Nastavi filter chain
        filterChain.doFilter(request, response);


    }
}
