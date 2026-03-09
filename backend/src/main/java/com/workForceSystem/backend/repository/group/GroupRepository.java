package com.workForceSystem.backend.repository.group;

import com.workForceSystem.backend.model.group.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findGroupsById(Long id);
}
