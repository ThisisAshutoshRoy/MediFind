package com.ashutosh.medicine.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final MedicineDataLoader medicineDataLoader;
    private final PharmacyDataLoader pharmacyDataLoader;
    private final InventoryDataLoader inventoryDataLoader;

    public DataLoader(MedicineDataLoader medicineDataLoader,
                      PharmacyDataLoader pharmacyDataLoader,
                      InventoryDataLoader inventoryDataLoader) {

        this.medicineDataLoader = medicineDataLoader;
        this.pharmacyDataLoader = pharmacyDataLoader;
        this.inventoryDataLoader = inventoryDataLoader;
    }

    @Override
    public void run(String... args) {

        medicineDataLoader.loadMedicines();

        pharmacyDataLoader.loadPharmacies();

        inventoryDataLoader.loadInventory();

        System.out.println("========================================");
        System.out.println(" MediFind Demo Database Loaded ");
        System.out.println("========================================");
    }
}