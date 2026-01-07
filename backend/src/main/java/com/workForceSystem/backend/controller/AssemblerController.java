package com.workForceSystem.backend.controller;

import com.workForceSystem.backend.dto.assembler.AssemblerRequestDTO;
import com.workForceSystem.backend.dto.assembler.AssemblerResponseDTO;
import com.workForceSystem.backend.service.assembler.AssemblerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
@RequiredArgsConstructor
public class AssemblerController {

    private final AssemblerService assemblerService;

    @PostMapping
    ResponseEntity<AssemblerResponseDTO> createAssembler(@RequestBody AssemblerRequestDTO assemblerRequestDTO) {
        AssemblerResponseDTO assemblerResponseDTO = assemblerService.saveNewAssembler(assemblerRequestDTO);
        return ResponseEntity.ok(assemblerResponseDTO);
    }

    // DAJ MI VODEEEE
    @GetMapping
    public List<AssemblerResponseDTO> getAllAssemblers() {
        return assemblerService.getAllAssemblers();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAssembler(@PathVariable Long id) {
        assemblerService.deleteAssembler(id);
        return ResponseEntity.noContent().build();
    }


}
