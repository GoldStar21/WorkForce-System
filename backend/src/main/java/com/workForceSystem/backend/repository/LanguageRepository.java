package com.workForceSystem.backend.repository;

import com.workForceSystem.backend.model.employee.Language;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByLanguage(String language);

}
