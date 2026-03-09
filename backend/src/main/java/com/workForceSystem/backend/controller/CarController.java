package com.workForceSystem.backend.controller;

import com.workForceSystem.backend.dto.car.CarRequestDTO;
import com.workForceSystem.backend.dto.car.CarResponseDTO;
import com.workForceSystem.backend.service.car.CarService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarService carService;

    /*
    1. createCar
    2. getAllCars
    3. deleteCar
     */

    @PostMapping
    public ResponseEntity<CarResponseDTO> createCar(@RequestBody CarRequestDTO carRequestDTO) {
        CarResponseDTO responseDTO = carService.saveNewCar(carRequestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping
    public List<CarResponseDTO> getAllCars() {
        return carService.getAllCars();
    }

    @PutMapping ("/{id}")
    public ResponseEntity<CarResponseDTO> updateCar(@PathVariable Long id, @RequestBody CarRequestDTO carRequestDTO) {
        CarResponseDTO carResponseDTO = carService.updateExistingCar(id, carRequestDTO);
        return ResponseEntity.ok(carResponseDTO);
    }
    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.noContent().build();
    }
}
