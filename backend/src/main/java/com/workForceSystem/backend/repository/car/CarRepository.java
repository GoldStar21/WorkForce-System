package com.workForceSystem.backend.repository.car;

import com.workForceSystem.backend.model.car.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findBySoldFalse();

}
