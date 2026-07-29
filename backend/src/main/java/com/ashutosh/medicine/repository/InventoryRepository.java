package com.ashutosh.medicine.repository;

import com.ashutosh.medicine.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByMedicineId(Long medicineId);

    List<Inventory> findByMedicineIdOrderByPriceAsc(Long medicineId);

}