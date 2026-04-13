package com.workForceSystem.backend.service.assembler;

import com.workForceSystem.backend.dto.assembler.AssemblerRequestDTO;
import com.workForceSystem.backend.dto.assembler.AssemblerResponseDTO;
import com.workForceSystem.backend.model.employee.Assembler;
import com.workForceSystem.backend.model.employee.AssemblerRole;
import com.workForceSystem.backend.model.employee.Language;
import com.workForceSystem.backend.repository.AssemblerRepository;
import com.workForceSystem.backend.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssemblerService {

    private final AssemblerRepository assemblerRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    // Save new Employee
    public AssemblerResponseDTO saveNewAssembler(AssemblerRequestDTO requestDto) {

        Assembler assembler = new Assembler();

        assembler.setName(requestDto.getName());
        assembler.setSurname(requestDto.getSurname());
        assembler.setEmail(requestDto.getEmail());
        assembler.setJob(requestDto.getJob());

        // Token
        String token = UUID.randomUUID().toString();
        assembler.setUsername(requestDto.getName().toLowerCase() + "." + requestDto.getSurname().toLowerCase());
        assembler.setInviteToken(token);
        assembler.setTokenExpiry(LocalDateTime.now().plusHours(24));
        assembler.setAccountActivated(false);
        assembler.setRole(AssemblerRole.EMPLOYEE);
        // END

        assembler.setLanguages(createLanguages(requestDto, assembler));

        // --------------------------
        Assembler savedAssembler = assemblerRepository.save(assembler);
        emailService.sendInviteEmail(savedAssembler.getEmail(), token);

        return convertEntityToDTO(savedAssembler);
    }

    // Get Assemblers
    public List<AssemblerResponseDTO> getAllAssemblers() {
        return assemblerRepository.findAll()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());

    }

    // Centralni mapper Entity → DTO
    private AssemblerResponseDTO convertEntityToDTO(Assembler assembler) {

        AssemblerResponseDTO dto = new AssemblerResponseDTO();
        dto.setId(assembler.getId());
        dto.setName(assembler.getName());
        dto.setSurname(assembler.getSurname());
        dto.setEmail(assembler.getEmail());
        dto.setJob(assembler.getJob());
        dto.setLanguages(assembler.getLanguages().stream().map(Language::getLanguage).toList());
        return dto;
    }

    // Helper metoda za languages
    private List<Language> createLanguages(AssemblerRequestDTO requestDto,
                                           Assembler assembler) {

        return requestDto.getLanguages()
                .stream()
                .map(langName -> {

                    Language language = new Language();

                    language.setLanguage(langName);

                    // bitno zbog JPA relationship
                    language.setAssembler(assembler);

                    return language;

                })
                .toList();
    }

    public void deleteAssembler(Long id) {

        if (!assemblerRepository.existsById(id)) {
            throw new RuntimeException("Assembler not found");
        }
        assemblerRepository.deleteById(id);
    }

    public AssemblerResponseDTO updateAssembler(Long id, AssemblerRequestDTO requestDto) {

        Assembler assembler = assemblerRepository.findById(id).orElseThrow(() -> new RuntimeException("Assembler not found"));

        assembler.setName(requestDto.getName());
        assembler.setSurname(requestDto.getSurname());
        assembler.setEmail(requestDto.getEmail());
        //assembler.setLanguages(requestDto.getLanguages());
        assembler.setJob(requestDto.getJob());


        assembler.getLanguages().clear();


        assembler.getLanguages().addAll(
                createLanguages(requestDto, assembler)
        );


        Assembler savedAssembler = assemblerRepository.save(assembler);
        return convertEntityToDTO(savedAssembler);


    }

    public void setPassword(String token, String password) {
        Assembler assembler = assemblerRepository.findByInviteToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));

        if (assembler.getTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        assembler.setPassword(passwordEncoder.encode(password));
        assembler.setInviteToken(null);
        assembler.setTokenExpiry(null);
        assembler.setAccountActivated(true);
        assemblerRepository.save(assembler);
    }
}
