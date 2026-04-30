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

                    // 2. Dohvati UserDetails
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                    // 3. Kreiraj Authentication objekt
                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    // 4. Postavi Authentication u SecurityContext
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

            } catch (Exception e) {
                System.err.println("Error processing JWT: " + e.getMessage());
            }
        }


        filterChain.doFilter(request, response);


    }
}
