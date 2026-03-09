package com.workForceSystem.backend.controller;

import com.workForceSystem.backend.dto.Employees.EmployeesResponseDTO;
import com.workForceSystem.backend.dto.group.GroupRequestDTO;
import com.workForceSystem.backend.dto.group.GroupResponseDTO;
import com.workForceSystem.backend.service.group.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;


     /*
    1. create new group
    2. update/edit group
    3. delete group
    4. get all groups
     */

    @PostMapping
    public ResponseEntity<GroupResponseDTO> createGroup(@RequestBody GroupRequestDTO groupRequestDTO) {
        GroupResponseDTO groupResponseDTO = groupService.saveNewGroup(groupRequestDTO);
        return ResponseEntity.ok(groupResponseDTO);

    }

    @GetMapping
    public List<GroupResponseDTO> getAllGroups() {
        return groupService.getAllCars();
    }

    // GET employees of the group
    @GetMapping("/{groupId}/employees")
    public ResponseEntity<List<EmployeesResponseDTO>> getEmployeesList(@PathVariable("groupId") Long id) {

        List<EmployeesResponseDTO> emp = groupService.getAllEmployees(id);

        return ResponseEntity.ok(emp);
    }


    @PutMapping("/{id}")
    public ResponseEntity<GroupResponseDTO> updateGroup(@PathVariable Long id, @RequestBody GroupRequestDTO groupRequestDTO) {
        GroupResponseDTO updated = groupService.updateGroup(id, groupRequestDTO);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }

    
}
