package com.workForceSystem.backend.service.assembler;

import com.workForceSystem.backend.dto.assembler.AssemblerRequestDTO;
import com.workForceSystem.backend.dto.assembler.AssemblerResponseDTO;
import com.workForceSystem.backend.model.employee.Assembler;
import com.workForceSystem.backend.model.employee.Language;
import com.workForceSystem.backend.repository.AssemblerRepository;
import com.workForceSystem.backend.repository.LanguageRepository;
import com.workForceSystem.backend.repository.car.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssemblerService {

    private final AssemblerRepository assemblerRepository;
    private final LanguageRepository languageRepository;
    private final CarRepository carRepository;

    // Save new Assembler/Electrician
    public AssemblerResponseDTO saveNewAssembler(AssemblerRequestDTO requestDto) {

        Assembler assembler = new Assembler();
        assembler.setName(requestDto.getName());
        assembler.setSurname(requestDto.getSurname());
        assembler.setEmail(requestDto.getEmail());
        assembler.setJob(requestDto.getJob());

        List<Language> languages = requestDto.getLanguages().stream()
                        .map(langName ->  {
                            Language language = new Language();
                            language.setLanguage(langName);
                            language.setAssembler(assembler);
                            return language;
                        })
                                .toList();

        assembler.setLanguages(languages);
        Assembler savedAssembler = assemblerRepository.save(assembler);

        AssemblerResponseDTO responseDto = new AssemblerResponseDTO();
        responseDto.setId(savedAssembler.getId());
        responseDto.setName(savedAssembler.getName());
        responseDto.setSurname(savedAssembler.getSurname());
        responseDto.setEmail(savedAssembler.getEmail());
        responseDto.setJob(savedAssembler.getJob());
        responseDto.setLanguages(savedAssembler.getLanguages().stream().map(Language::getLanguage).toList());

        return responseDto;
    }

    // Get Assemblers
    public List<AssemblerResponseDTO> getAllAssemblers() {
        return assemblerRepository.findAll()
                .stream()
                .map(this::convertEntityToDTO)
                .collect(Collectors.toList());

    }

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

    public void deleteAssembler(Long id) {

        if(!assemblerRepository.existsById(id)) {
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

        // 1️⃣ Obriši stare jezike (orphanRemoval će ih maknuti iz baze)
        assembler.getLanguages().clear();

        // 2️⃣ Dodaj nove
        List<Language> languages = requestDto.getLanguages().stream()
                .map(langName -> {
                    Language language = new Language();
                    language.setLanguage(langName);
                    language.setAssembler(assembler);
                    return language;
                })
                .toList();

        



        assembler.getLanguages().addAll(languages);




        Assembler savedAssembler = assemblerRepository.save(assembler);
        return convertEntityToDTO(savedAssembler);


    }
}
