package com.ashutosh.medicine.repository;

import com.ashutosh.medicine.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    Optional<Medicine> findByNameIgnoreCase(String name);
    List<Medicine> findByNameContainingIgnoreCase(String keyword);
    List<Medicine> findByActiveIngredientIgnoreCase(String activeIngredient);

}