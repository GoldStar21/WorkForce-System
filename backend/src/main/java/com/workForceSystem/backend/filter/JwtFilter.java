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

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    /*
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,  FilterChain filterChain) throws ServletException, java.io.IOException {


        // Skip OPTIONS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }



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

     */

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // Skip OPTIONS preflight requests
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        // Skip auth routes
        String path = request.getServletPath();
        if (path.startsWith("/auth") || path.equals("/employees/set-password")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = null;

        // 🔥 FIX: čitanje JWT iz RAW cookie headera (NE getCookies!)
        String cookieHeader = request.getHeader("Cookie");

        if (cookieHeader != null) {
            String[] cookies = cookieHeader.split(";");

            for (String cookie : cookies) {
                cookie = cookie.trim();

                if (cookie.startsWith("jwt=")) {
                    token = cookie.substring(4);
                    break;
                }
            }
        }

        // Debug (privremeno ako treba)
        // System.out.println("COOKIE HEADER: " + cookieHeader);
        // System.out.println("TOKEN: " + token);

        // Validate token + set authentication
        if (token != null) {

            try {
                boolean isValid = jwtService.validateToken(token);

                if (isValid && SecurityContextHolder.getContext().getAuthentication() == null) {

                    String username = jwtService.extractUsername(token);

                    if (username != null) {

                        UserDetails userDetails =
                                userDetailsService.loadUserByUsername(username);

                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }

            } catch (Exception e) {
                System.err.println("JWT processing error: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}
