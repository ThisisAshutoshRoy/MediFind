package com.ashutosh.medicine.config;

import com.ashutosh.medicine.entity.Inventory;
import com.ashutosh.medicine.entity.Medicine;
import com.ashutosh.medicine.entity.Pharmacy;
import com.ashutosh.medicine.repository.InventoryRepository;
import com.ashutosh.medicine.repository.MedicineRepository;
import com.ashutosh.medicine.repository.PharmacyRepository;
import com.ashutosh.medicine.util.CsvReaderUtil;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class InventoryDataLoader {

    private final InventoryRepository inventoryRepository;
    private final MedicineRepository medicineRepository;
    private final PharmacyRepository pharmacyRepository;
    private final CsvReaderUtil csvReaderUtil;

    public InventoryDataLoader(
            InventoryRepository inventoryRepository,
            MedicineRepository medicineRepository,
            PharmacyRepository pharmacyRepository,
            CsvReaderUtil csvReaderUtil) {

        this.inventoryRepository = inventoryRepository;
        this.medicineRepository = medicineRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.csvReaderUtil = csvReaderUtil;
    }

    public void loadInventory() {

        if (inventoryRepository.count() > 0) {
            System.out.println("Inventory already loaded.");
            return;
        }

        System.out.println("Loading inventory...");

        List<String[]> rows = csvReaderUtil.readCsv("inventory.csv");

        for (int i = 1; i < rows.size(); i++) {

            String[] row = rows.get(i);

            Long medicineId = Long.parseLong(row[0]);
            Long pharmacyId = Long.parseLong(row[1]);

            Medicine medicine = medicineRepository.findById(medicineId).orElse(null);
            Pharmacy pharmacy = pharmacyRepository.findById(pharmacyId).orElse(null);

            if (medicine == null || pharmacy == null) {
                continue;
            }

            Inventory inventory = Inventory.builder()
                    .medicine(medicine)
                    .pharmacy(pharmacy)
                    .price(Double.parseDouble(row[2]))
                    .stock(Integer.parseInt(row[3]))
                    .available(Boolean.parseBoolean(row[4]))
                    .build();

            inventoryRepository.save(inventory);
        }

        System.out.println("Inventory imported successfully.");
    }
}