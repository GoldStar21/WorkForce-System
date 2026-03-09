package com.workForceSystem.backend.model.group;

import com.workForceSystem.backend.model.car.Car;
import com.workForceSystem.backend.model.employee.Assembler;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "project_groups")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String country;
    private String adress;
    private LocalDate dateFrom;
    private LocalDate dateTo;


    @ManyToOne
    @JoinColumn(name = "cars_id")
    private Car car;


    @ManyToMany
    @JoinTable(name = "group_employee", joinColumns = @JoinColumn(name = "project_groups_id"), inverseJoinColumns = @JoinColumn(name = "employee_id"))
    private List<Assembler> employees = new ArrayList<>();


}

