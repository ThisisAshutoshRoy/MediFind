package com.ashutosh.medicine.service;

import com.ashutosh.medicine.dto.InventoryResponse;
import com.ashutosh.medicine.entity.Inventory;
import com.ashutosh.medicine.entity.Medicine;
import com.ashutosh.medicine.repository.InventoryRepository;
import com.ashutosh.medicine.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;
    private final MedicineRepository medicineRepository;

    public InventoryService(
            InventoryRepository inventoryRepository,
            MedicineRepository medicineRepository
    ) {

        this.inventoryRepository = inventoryRepository;
        this.medicineRepository = medicineRepository;

    }

    // ====================================================
    // User - Get inventory for a medicine
    // ====================================================

    public List<InventoryResponse> getInventoryByMedicine(String medicineName) {

        Optional<Medicine> medicineOptional =
                medicineRepository.findByNameIgnoreCase(medicineName);

        if (medicineOptional.isEmpty()) {

            return List.of();

        }

        Medicine medicine = medicineOptional.get();

        List<Inventory> inventories =
                inventoryRepository.findByMedicineIdOrderByPriceAsc(
                        medicine.getId()
                );

        inventories = inventories.stream()
                .filter(Inventory::getAvailable)
                .toList();

        return inventories.stream()

                .map(inventory ->

                        InventoryResponse.builder()

                                .pharmacyName(
                                        inventory.getPharmacy().getName()
                                )

                                .pharmacyAddress(
                                        inventory.getPharmacy().getAddress()
                                )

                                .city(
                                        inventory.getPharmacy().getCity()
                                )

                                .price(
                                        inventory.getPrice()
                                )

                                .stock(
                                        inventory.getStock()
                                )

                                .available(
                                        inventory.getAvailable()
                                )

                                .build()

                )

                .sorted(
                        Comparator.comparing(
                                InventoryResponse::getPrice
                        )
                )

                .collect(Collectors.toList());

    }

    // ====================================================
    // Admin CRUD
    // ====================================================

    public List<Inventory> getAllInventory() {

        return inventoryRepository.findAll();

    }

    public Optional<Inventory> getInventoryById(Long id) {

        return inventoryRepository.findById(id);

    }

    public Inventory saveInventory(Inventory inventory) {

        return inventoryRepository.save(inventory);

    }

    public void deleteInventory(Long id) {

        inventoryRepository.deleteById(id);

    }

}