package com.workForceSystem.backend.service;

import com.workForceSystem.backend.model.User;
import com.workForceSystem.backend.repository.AssemblerRepository;
import com.workForceSystem.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final AssemblerRepository assemblerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       // User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return user.get();
        }

        // Ako nije admin, pokušaj naći radnika
        return assemblerRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
