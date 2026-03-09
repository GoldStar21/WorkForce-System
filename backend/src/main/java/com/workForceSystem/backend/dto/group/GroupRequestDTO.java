package com.workForceSystem.backend.dto.group;

import com.workForceSystem.backend.model.car.Car;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class GroupRequestDTO {

    private String name;
    private String country;
    private String adress;

    private LocalDate dateFrom;
    private LocalDate dateTo;

    private Long carId;
    private List<Long> employeesId;
}
