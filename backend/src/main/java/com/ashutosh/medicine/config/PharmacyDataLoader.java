package com.ashutosh.medicine.config;

import com.ashutosh.medicine.entity.Pharmacy;
import com.ashutosh.medicine.repository.PharmacyRepository;
import com.ashutosh.medicine.util.CsvReaderUtil;
import org.springframework.stereotype.Component;

import java.time.LocalTime;
import java.util.List;

@Component
public class PharmacyDataLoader {

    private final PharmacyRepository pharmacyRepository;
    private final CsvReaderUtil csvReaderUtil;

    public PharmacyDataLoader(PharmacyRepository pharmacyRepository,
                              CsvReaderUtil csvReaderUtil) {
        this.pharmacyRepository = pharmacyRepository;
        this.csvReaderUtil = csvReaderUtil;
    }

    public void loadPharmacies() {

        if (pharmacyRepository.count() > 0) {
            System.out.println("Pharmacies already loaded.");
            return;
        }

        System.out.println("Loading pharmacies...");

        List<String[]> rows = csvReaderUtil.readCsv("pharmacies.csv");

        for (int i = 1; i < rows.size(); i++) {

            String[] row = rows.get(i);

            Pharmacy pharmacy = Pharmacy.builder()
                    .name(row[0])
                    .address(row[1])
                    .city(row[2])
                    .latitude(Double.parseDouble(row[3]))
                    .longitude(Double.parseDouble(row[4]))
                    .phoneNumber(row[5])
                    .email(row[6])
                    .openingTime(LocalTime.parse(row[7]))
                    .closingTime(LocalTime.parse(row[8]))
                    .open24Hours(Boolean.parseBoolean(row[9]))
                    .build();

            pharmacyRepository.save(pharmacy);
        }

        System.out.println("Pharmacies imported successfully.");
    }
}