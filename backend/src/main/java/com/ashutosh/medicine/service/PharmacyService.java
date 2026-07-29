package com.ashutosh.medicine.service;

import com.ashutosh.medicine.entity.Pharmacy;
import com.ashutosh.medicine.repository.PharmacyRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PharmacyService {

    private final PharmacyRepository pharmacyRepository;

    public PharmacyService(PharmacyRepository pharmacyRepository) {

        this.pharmacyRepository = pharmacyRepository;

    }

    // Get all pharmacies
    public List<Pharmacy> getAllPharmacies() {

        return pharmacyRepository.findAll();

    }

    // Get pharmacy by ID
    public Optional<Pharmacy> getPharmacyById(Long id) {

        return pharmacyRepository.findById(id);

    }

    // Get pharmacies by city
    public List<Pharmacy> getPharmaciesByCity(String city) {

        return pharmacyRepository.findByCityIgnoreCase(city);

    }

    // Get all 24-hour pharmacies
    public List<Pharmacy> getOpen24HourPharmacies() {

        return pharmacyRepository.findByOpen24Hours(true);

    }

    // Save Pharmacy
    public Pharmacy savePharmacy(Pharmacy pharmacy) {

        return pharmacyRepository.save(pharmacy);

    }

    // Delete Pharmacy
    public void deletePharmacy(Long id) {

        pharmacyRepository.deleteById(id);

    }

}