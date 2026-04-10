package com.workForceSystem.backend.data;

import com.workForceSystem.backend.model.User;
import com.workForceSystem.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor

public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public void run(String... args) throws Exception {

        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("Administrator");
            admin.setPassword(passwordEncoder.encode("Admin1234"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Admin user created: username=Admin21, password=Admin1234");
        } else {
            System.out.println("Admin user already exists, skipping seeding.");
        }


    }
}
