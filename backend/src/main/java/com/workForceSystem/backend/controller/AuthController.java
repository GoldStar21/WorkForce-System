package com.workForceSystem.backend.controller;


import com.workForceSystem.backend.dto.LoginRequest;
import com.workForceSystem.backend.dto.LoginResponse;
import com.workForceSystem.backend.model.User;
import com.workForceSystem.backend.service.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    // Potrebno
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {

        // User authentication
        // Koristenje auth managera kojem je potreban customUserDetailsService

        try {
            // User Authentication
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

            // Treba vidjet UserDetailsService ima li veze sa ovim
            User user = (User) authentication.getPrincipal();

            // JWT token create
            String token = jwtService.createToken(user);

            // 4. Kreiranje HttpOnly kolačića - SRŽ IMPLEMENTACIJE
            ResponseCookie responseCookie = ResponseCookie.from("jwt", token)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60*60)
                    .sameSite("Lax")
                    .build();

            // 5. Dodavanje kolačića u response header
            response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());

            return ResponseEntity.ok(new LoginResponse(user.getUsername(), user.getRole()));


        }catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid credentials");

        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {

        ResponseCookie deleteCookie = ResponseCookie.from("jwt", "")
             .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(0)  // <= briše cookie odmah
                    .sameSite("Lax")
                    .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());
        return ResponseEntity.ok("Logged out");

    }


}
