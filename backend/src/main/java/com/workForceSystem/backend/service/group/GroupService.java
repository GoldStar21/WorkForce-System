package com.workForceSystem.backend.service.group;

import com.workForceSystem.backend.dto.Employees.EmployeesResponseDTO;
import com.workForceSystem.backend.dto.group.GroupRequestDTO;
import com.workForceSystem.backend.dto.group.GroupResponseDTO;
import com.workForceSystem.backend.model.car.Car;
import com.workForceSystem.backend.model.employee.Assembler;
import com.workForceSystem.backend.model.group.Group;
import com.workForceSystem.backend.repository.AssemblerRepository;
import com.workForceSystem.backend.repository.car.CarRepository;
import com.workForceSystem.backend.repository.group.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GroupService {

    private final GroupRepository groupRepository;
    private final CarRepository carRepository;
    private final AssemblerRepository assemblerRepository;


    public GroupResponseDTO saveNewGroup(GroupRequestDTO groupRequestDTO) {

        Group group = new Group();
        group.setName(groupRequestDTO.getName());
        group.setCountry(groupRequestDTO.getCountry());
        group.setAdress(groupRequestDTO.getAdress());
        group.setDateFrom(groupRequestDTO.getDateFrom());
        group.setDateTo(groupRequestDTO.getDateTo());

        if (groupRequestDTO.getCarId() != null) {
            Car car = carRepository.findById(groupRequestDTO.getCarId()).orElse(null);
            group.setCar(car);
        }

        if (groupRequestDTO.getEmployeesId() != null) {
            List<Assembler> list = assemblerRepository.findAllById(groupRequestDTO.getEmployeesId());
            group.setEmployees(list);
        }

        Group savedGroup = groupRepository.save(group);

        return convertToDTO(savedGroup);


    }

    // Conversion from entity to DTO
    private GroupResponseDTO convertToDTO(Group group) {
        GroupResponseDTO groupResponseDTO = new GroupResponseDTO();
        groupResponseDTO.setId(group.getId());
        groupResponseDTO.setName(group.getName());
        groupResponseDTO.setCountry(group.getCountry());
        groupResponseDTO.setAdress(group.getAdress());
        groupResponseDTO.setDateFrom(group.getDateFrom());
        groupResponseDTO.setDateTo(group.getDateTo());
        if (group.getCar() != null) {
            groupResponseDTO.setCarId(group.getCar().getId());
        }
        groupResponseDTO.setEmployeesId(group.getEmployees().stream().map(Assembler::getId).toList());
        return groupResponseDTO;
    }


    public List<GroupResponseDTO> getAllCars() {
        return groupRepository.findAll().stream().map(group -> convertToDTO(group)).collect(Collectors.toList());

    }


    // Service za prikaz radnika iz grupe
    public List<EmployeesResponseDTO> getAllEmployees(Long groupId) {

        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        return group.getEmployees()
                .stream()
                .map(EmployeesResponseDTO::fromEntity)
                .toList();
    }

    public GroupResponseDTO updateGroup(Long id, GroupRequestDTO groupRequestDTO) {
        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setName(groupRequestDTO.getName());
        group.setCountry(groupRequestDTO.getCountry());
        group.setAdress(groupRequestDTO.getAdress());
        group.setDateFrom(groupRequestDTO.getDateFrom());
        group.setDateTo(groupRequestDTO.getDateTo());

        if (groupRequestDTO.getCarId() != null) {
            Car car = carRepository.findById(groupRequestDTO.getCarId()).orElse(null);
            group.setCar(car);
        }

        if (groupRequestDTO.getEmployeesId() != null) {
            List<Assembler> list = assemblerRepository.findAllById(groupRequestDTO.getEmployeesId());
            group.setEmployees(list);
        }

        Group savedGroup = groupRepository.save(group);
        return convertToDTO(savedGroup);
    }

    public void deleteGroup(Long id) {

        if(!groupRepository.existsById(id)) {
            throw new RuntimeException("Assembler not found");
        }
        groupRepository.deleteById(id);
    }
}

