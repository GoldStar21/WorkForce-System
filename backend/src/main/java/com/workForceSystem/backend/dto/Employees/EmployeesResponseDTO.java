package com.workForceSystem.backend.dto.Employees;

import com.workForceSystem.backend.model.employee.Assembler;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeesResponseDTO {

    private Long id;
    private String name;
    private String surname;

    public static EmployeesResponseDTO fromEntity(Assembler assembler) {
        return new EmployeesResponseDTO(assembler.getId(), assembler.getName(), assembler.getSurname());
    }

}
