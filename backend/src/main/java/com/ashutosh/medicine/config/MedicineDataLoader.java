package com.ashutosh.medicine.config;

import com.ashutosh.medicine.entity.Medicine;
import com.ashutosh.medicine.repository.MedicineRepository;
import com.ashutosh.medicine.util.CsvReaderUtil;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MedicineDataLoader {

    private final MedicineRepository medicineRepository;
    private final CsvReaderUtil csvReaderUtil;

    public MedicineDataLoader(MedicineRepository medicineRepository,
                              CsvReaderUtil csvReaderUtil) {
        this.medicineRepository = medicineRepository;
        this.csvReaderUtil = csvReaderUtil;
    }

    public void loadMedicines() {

        System.out.println("Loading medicines...");

        List<String[]> rows = csvReaderUtil.readCsv("medicines.csv");

        int imported = 0;
        int skipped = 0;

        for (int i = 1; i < rows.size(); i++) {

            String[] row = rows.get(i);

            if (row.length < 8) {
                System.out.println("Skipping invalid row " + i);
                continue;
            }

            if (medicineRepository.findByNameIgnoreCase(row[0]).isPresent()) {
                continue;
            }

            Medicine medicine = Medicine.builder()
                    .name(row[0].trim())
                    .activeIngredient(row[1].trim())
                    .dosage(row[2].trim())
                    .dosageForm(row[3].trim())
                    .manufacturer(row[4].trim())
                    .category(row[5].trim())
                    .description(row[6].trim())
                    .sideEffects(row[7].trim())
                    .build();

            medicineRepository.save(medicine);
        }

        System.out.println("====================================");
        System.out.println("Medicine Import Complete");
        System.out.println("Imported : " + imported);
        System.out.println("Skipped  : " + skipped);
        System.out.println("Total DB : " + medicineRepository.count());
        System.out.println("====================================");
    }
}