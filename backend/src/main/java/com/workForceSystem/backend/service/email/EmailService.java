package com.workForceSystem.backend.service.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendInviteEmail(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@workforce.com");
        message.setTo(toEmail);
        message.setSubject("WorkForce System - Set your password");
        message.setText("Hello,\n\nYou have been added to WorkForce System.\n\n" +
                "Please set your password by clicking the link below:\n\n" +
                "Username is already created and assigned to you\n\n" +
                "http://localhost:3000/set-password?token=" + token + "\n\n" +
                "Link expires in 24 hours.");

        mailSender.send(message);
    }
}
