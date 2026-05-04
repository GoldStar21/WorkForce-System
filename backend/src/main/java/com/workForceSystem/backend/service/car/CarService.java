package com.workForceSystem.backend.service.car;

import com.workForceSystem.backend.dto.car.CarRequestDTO;
import com.workForceSystem.backend.dto.car.CarResponseDTO;
import com.workForceSystem.backend.model.car.Car;
import com.workForceSystem.backend.repository.car.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public CarResponseDTO saveNewCar(CarRequestDTO carRequestDTO) {

        Car car = new Car();
        car.setMake(carRequestDTO.getMake());
        car.setModel(carRequestDTO.getModel());
        car.setYear(carRequestDTO.getYear());
        car.setFuel(carRequestDTO.getFuel());
        car.setPlates(carRequestDTO.getPlates());
        car.setTuv(carRequestDTO.getTuv());

        Car savedCar = carRepository.save(car);

        return convertToDTO(savedCar);
    }

    public List<CarResponseDTO> getAllCars() {

        return carRepository.findBySoldFalse().stream().map(this::convertToDTO).collect(Collectors.toList());

    }

    // Method for entity to dto conversion
    private CarResponseDTO convertToDTO(Car car) {
        CarResponseDTO carResponseDTO = new CarResponseDTO();
        carResponseDTO.setId(car.getId());
        carResponseDTO.setMake(car.getMake());
        carResponseDTO.setModel(car.getModel());
        carResponseDTO.setYear(car.getYear());
        carResponseDTO.setFuel(car.getFuel());
        carResponseDTO.setPlates(car.getPlates());
        carResponseDTO.setTuv(car.getTuv());
        return carResponseDTO;
    }

    // Method for car update
    public CarResponseDTO updateExistingCar(Long id, CarRequestDTO carRequestDTO) {

        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));

        car.setMake(carRequestDTO.getMake());
        car.setModel(carRequestDTO.getModel());
        car.setYear(carRequestDTO.getYear());
        car.setTuv(carRequestDTO.getTuv());
        car.setFuel(carRequestDTO.getFuel());
        car.setPlates(carRequestDTO.getPlates());

        Car SavedCar = carRepository.save(car);
        return convertToDTO(SavedCar);
    }

    public void deleteCar(Long id) {

        Car car = carRepository.findById(id).orElseThrow(() -> new RuntimeException("Car not found"));
        car.setSold(true);

        carRepository.save(car);
    }

}
