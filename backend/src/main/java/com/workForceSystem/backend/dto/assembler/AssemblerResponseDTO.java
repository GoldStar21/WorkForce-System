package com.workForceSystem.backend.dto.assembler;

import lombok.Data;
import java.util.List;

@Data
public class AssemblerResponseDTO {

    private Long id;
    private String name;
    private String surname;
    private String email;
    private List<String> languages;
    private String job;

}
