package com.ashutosh.medicine.repository;

import com.ashutosh.medicine.entity.Pharmacy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PharmacyRepository extends JpaRepository<Pharmacy, Long> {

    List<Pharmacy> findByCityIgnoreCase(String city);

    List<Pharmacy> findByOpen24Hours(Boolean open24Hours);

}