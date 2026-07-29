package com.ashutosh.medicine.controller;

import com.ashutosh.medicine.entity.Pharmacy;
import com.ashutosh.medicine.service.PharmacyService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pharmacies")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
public class PharmacyController {

    private final PharmacyService pharmacyService;

    public PharmacyController(PharmacyService pharmacyService) {
        this.pharmacyService = pharmacyService;
    }

    // ==========================
    // GET ALL PHARMACIES
    // ==========================
    @GetMapping
    public List<Pharmacy> getAllPharmacies() {

        return pharmacyService.getAllPharmacies();

    }

    // ==========================
    // GET BY ID
    // ==========================
    @GetMapping("/{id}")
    public Optional<Pharmacy> getPharmacyById(
            @PathVariable Long id
    ) {

        return pharmacyService.getPharmacyById(id);

    }

    // ==========================
    // SEARCH BY CITY
    // ==========================
    @GetMapping("/city/{city}")
    public List<Pharmacy> getPharmaciesByCity(
            @PathVariable String city
    ) {

        return pharmacyService.getPharmaciesByCity(city);

    }

    // ==========================
    // OPEN 24 HOURS
    // ==========================
    @GetMapping("/open24")
    public List<Pharmacy> getOpen24HourPharmacies() {

        return pharmacyService.getOpen24HourPharmacies();

    }

    // ==========================
    // ADD PHARMACY
    // ==========================
    @PostMapping
    public Pharmacy addPharmacy(
            @RequestBody Pharmacy pharmacy
    ) {

        return pharmacyService.savePharmacy(pharmacy);

    }

    // ==========================
    // UPDATE PHARMACY
    // ==========================
    @PutMapping("/{id}")
    public Pharmacy updatePharmacy(

            @PathVariable Long id,

            @RequestBody Pharmacy pharmacy

    ) {

        pharmacy.setId(id);

        return pharmacyService.savePharmacy(pharmacy);

    }

    // ==========================
    // DELETE PHARMACY
    // ==========================
    @DeleteMapping("/{id}")
    public void deletePharmacy(
            @PathVariable Long id
    ) {

        pharmacyService.deletePharmacy(id);

    }

}