package com.workForceSystem.backend.repository;

import com.workForceSystem.backend.model.employee.Assembler;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssemblerRepository extends JpaRepository<Assembler, Long> {
    // Maybe some custom methods like find by id, but will se
}
