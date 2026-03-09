package com.workForceSystem.backend.dto.group;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class GroupResponseDTO {

    private Long id;
    private String name;
    private String country;
    private String adress;

    private LocalDate dateFrom;
    private LocalDate dateTo;

    private Long carId;
    private List<Long> employeesId;
}
