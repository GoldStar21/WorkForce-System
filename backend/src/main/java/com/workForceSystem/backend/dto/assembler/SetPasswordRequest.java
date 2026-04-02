package com.workForceSystem.backend.dto.assembler;

import lombok.Data;

@Data
public class SetPasswordRequest {
    private String token;
    private String password;
}
