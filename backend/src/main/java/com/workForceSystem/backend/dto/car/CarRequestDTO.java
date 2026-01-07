package com.workForceSystem.backend.dto.car;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CarRequestDTO {

    private String make;
    private String model;
    private String year;
    private String fuel;
    private String plates;
    private LocalDate tuv;
}
