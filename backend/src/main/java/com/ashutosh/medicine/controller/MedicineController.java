package com.ashutosh.medicine.controller;

import com.ashutosh.medicine.dto.BestAlternativeResponse;
import com.ashutosh.medicine.dto.DashboardStatsResponse;
import com.ashutosh.medicine.dto.MedicineComparisonPairResponse;
import com.ashutosh.medicine.dto.MedicineComparisonResponse;
import com.ashutosh.medicine.dto.PharmacyResponse;
import com.ashutosh.medicine.dto.RecommendationResponse;
import com.ashutosh.medicine.entity.Medicine;
import com.ashutosh.medicine.service.MedicineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/medicines")
public class MedicineController {

    private final MedicineService medicineService;

    public MedicineController(MedicineService medicineService) {
        this.medicineService = medicineService;
    }

    // ===============================
    // GET ALL MEDICINES
    // ===============================
    @GetMapping("/all")
    public List<Medicine> getAllMedicines() {

        return medicineService.getAllMedicines();

    }

    // ===============================
    // SEARCH MEDICINE BY NAME
    // ===============================
    @GetMapping("/search")
    public Optional<Medicine> searchMedicineByName(
            @RequestParam String name
    ) {

        return medicineService.getMedicineByName(name);

    }

    // ===============================
    // GET MEDICINE BY ID
    // ===============================
    @GetMapping("/{id}")
    public Optional<Medicine> getMedicineById(
            @PathVariable Long id
    ) {

        return medicineService.getMedicineById(id);

    }

    // ===============================
    // GET MEDICINE NAMES
    // ===============================
    @GetMapping("/names")
    public List<String> getMedicineNames() {

        return medicineService.getAllMedicines()
                .stream()
                .map(Medicine::getName)
                .toList();

    }

    @GetMapping("/search-all")
    public List<Medicine> searchMedicines(
            @RequestParam String keyword
    ) {
        return medicineService.searchMedicines(keyword);
    }

    // ===============================
    // ADD MEDICINE
    // ===============================
    @PostMapping
    public Medicine addMedicine(
            @RequestBody Medicine medicine
    ) {

        return medicineService.saveMedicine(medicine);

    }

    // ===============================
    // UPDATE MEDICINE
    // ===============================
    @PutMapping("/{id}")
    public Medicine updateMedicine(

            @PathVariable Long id,

            @RequestBody Medicine medicine

    ) {

        medicine.setId(id);

        return medicineService.saveMedicine(medicine);

    }

    // ===============================
    // DELETE MEDICINE
    // ===============================
    @DeleteMapping("/{id}")
    public void deleteMedicine(
            @PathVariable Long id
    ) {

        medicineService.deleteMedicine(id);

    }

    // ===============================
    // RECOMMEND MEDICINES
    // ===============================
    @GetMapping("/recommend")
    public List<RecommendationResponse> recommendMedicines(
            @RequestParam String name
    ) {

        return medicineService.recommendMedicines(name);

    }

    // ===============================
    // BEST ALTERNATIVE
    // ===============================
    @GetMapping("/best-alternative")
    public BestAlternativeResponse bestAlternative(
            @RequestParam String name
    ) {

        return medicineService.getBestAlternative(name);

    }

    // ===============================
    // COMPARE ONE MEDICINE
    // ===============================
    @GetMapping("/compare")
    public MedicineComparisonResponse compareMedicine(
            @RequestParam String name
    ) {

        return medicineService.compareMedicine(name);

    }

    // ===============================
    // COMPARE TWO MEDICINES
    // ===============================
    @GetMapping("/compare-two")
    public MedicineComparisonPairResponse compareTwoMedicines(

            @RequestParam String medicine1,

            @RequestParam String medicine2

    ) {

        return medicineService.compareMedicines(
                medicine1,
                medicine2
        );

    }

    // ===============================
    // PHARMACIES
    // ===============================
    @GetMapping("/pharmacies")
    public List<PharmacyResponse> getPharmacies(
            @RequestParam String name
    ) {

        return medicineService.getPharmacies(name);

    }

    // ===============================
    // DASHBOARD STATS
    // ===============================
    @GetMapping("/dashboard")
    public DashboardStatsResponse getDashboardStats() {

        return medicineService.getDashboardStats();

    }

}