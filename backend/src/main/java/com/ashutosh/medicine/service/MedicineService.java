package com.ashutosh.medicine.service;

import com.ashutosh.medicine.dto.DashboardStatsResponse;
import com.ashutosh.medicine.dto.RecommendationResponse;
import com.ashutosh.medicine.entity.Medicine;
import com.ashutosh.medicine.repository.MedicineRepository;
import org.springframework.stereotype.Service;
import com.ashutosh.medicine.dto.MedicineComparisonResponse;
import com.ashutosh.medicine.entity.Inventory;
import com.ashutosh.medicine.repository.InventoryRepository;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import com.ashutosh.medicine.dto.BestAlternativeResponse;
import com.ashutosh.medicine.dto.MedicineComparisonPairResponse;
import com.ashutosh.medicine.dto.PharmacyResponse;
import com.ashutosh.medicine.repository.AdminUserRepository;
import com.ashutosh.medicine.repository.PharmacyRepository;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final InventoryRepository inventoryRepository;
    private final PharmacyRepository pharmacyRepository;

    private final AdminUserRepository adminUserRepository;

    public MedicineService(
            MedicineRepository medicineRepository,
            InventoryRepository inventoryRepository,
            PharmacyRepository pharmacyRepository,
            AdminUserRepository adminUserRepository
    ) {

        this.medicineRepository = medicineRepository;
        this.inventoryRepository = inventoryRepository;
        this.pharmacyRepository = pharmacyRepository;
        this.adminUserRepository = adminUserRepository;

    }

    // Get all medicines
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    // Get medicine by ID
    public Optional<Medicine> getMedicineById(Long id) {
        return medicineRepository.findById(id);
    }

    // Search medicine by name
    public Optional<Medicine> getMedicineByName(String name) {
        return medicineRepository.findByNameIgnoreCase(name);
    }

    // Search medicines by partial name
    public List<Medicine> searchMedicines(String keyword) {
        return medicineRepository.findByNameContainingIgnoreCase(keyword);
    }

    // Search medicines by active ingredient
    public List<Medicine> getMedicinesByActiveIngredient(String activeIngredient) {
        return medicineRepository.findByActiveIngredientIgnoreCase(activeIngredient);
    }

    public DashboardStatsResponse getDashboardStats() {

        List<Inventory> inventories = inventoryRepository.findAll();

        long availableInventory = inventories.stream()
                .filter(item -> Boolean.TRUE.equals(item.getAvailable()))
                .count();

        long outOfStock = inventories.stream()
                .filter(item -> item.getStock() != null && item.getStock() == 0)
                .count();

        long lowStock = inventories.stream()
                .filter(item ->
                        item.getStock() != null &&
                                item.getStock() > 0 &&
                                item.getStock() < 10)
                .count();

        double averagePrice = inventories.stream()
                .filter(item -> item.getPrice() != null)
                .mapToDouble(Inventory::getPrice)
                .average()
                .orElse(0.0);

        return DashboardStatsResponse.builder()

                .medicines(medicineRepository.count())

                .pharmacies(pharmacyRepository.count())

                .inventory(inventoryRepository.count())

                .admins(adminUserRepository.count())

                .availableInventory(availableInventory)

                .outOfStock(outOfStock)

                .lowStock(lowStock)

                .averagePrice(
                        Math.round(averagePrice * 100.0) / 100.0
                )

                .build();

    }

    // ===============================
    // Recommendation Engine
    // ===============================
    public List<RecommendationResponse> recommendMedicines(String medicineName) {

        Optional<Medicine> medicineOptional =
                medicineRepository.findByNameIgnoreCase(medicineName);

        if (medicineOptional.isEmpty()) {
            return List.of();
        }

        Medicine searchedMedicine = medicineOptional.get();

        List<Medicine> candidates =
                medicineRepository.findByActiveIngredientIgnoreCase(
                        searchedMedicine.getActiveIngredient());

        List<RecommendationResponse> recommendations = new ArrayList<>();

        for (Medicine candidate : candidates) {

            if (candidate.getId().equals(searchedMedicine.getId())) {
                continue;
            }

            int score = calculateRecommendationScore(searchedMedicine, candidate);

            String reason = generateRecommendationReason(searchedMedicine, candidate);

            RecommendationResponse response =
                    RecommendationResponse.builder()
                            .medicineName(candidate.getName())
                            .manufacturer(candidate.getManufacturer())
                            .activeIngredient(candidate.getActiveIngredient())
                            .dosage(candidate.getDosage())
                            .dosageForm(candidate.getDosageForm())
                            .category(candidate.getCategory())
                            .recommendationScore(score)
                            .recommendationReason(reason)
                            .build();

            recommendations.add(response);
        }

        recommendations.sort(
                Comparator.comparingInt(
                        RecommendationResponse::getRecommendationScore
                ).reversed()
        );

        return recommendations;
    }

    // ===============================
    // Recommendation Score
    // ===============================
    private int calculateRecommendationScore(Medicine searched, Medicine candidate) {

        int score = 0;

        // Same Active Ingredient
        if (searched.getActiveIngredient().equalsIgnoreCase(candidate.getActiveIngredient())) {
            score += 50;
        }

        // Same Dosage
        if (searched.getDosage().equalsIgnoreCase(candidate.getDosage())) {
            score += 25;
        }

        // Same Dosage Form
        if (searched.getDosageForm().equalsIgnoreCase(candidate.getDosageForm())) {
            score += 15;
        }

        // Same Category
        if (searched.getCategory().equalsIgnoreCase(candidate.getCategory())) {
            score += 10;
        }

        return score;
    }

    // ===============================
    // Recommendation Explanation
    // ===============================
    private String generateRecommendationReason(Medicine searched, Medicine candidate) {

        List<String> reasons = new ArrayList<>();

        if (searched.getActiveIngredient().equalsIgnoreCase(candidate.getActiveIngredient())) {
            reasons.add("Same active ingredient");
        }

        if (searched.getDosage().equalsIgnoreCase(candidate.getDosage())) {
            reasons.add("Same dosage");
        }

        if (searched.getDosageForm().equalsIgnoreCase(candidate.getDosageForm())) {
            reasons.add("Same dosage form");
        }

        if (searched.getCategory().equalsIgnoreCase(candidate.getCategory())) {
            reasons.add("Same therapeutic category");
        }

        return String.join(", ", reasons);
    }

    public MedicineComparisonResponse compareMedicine(String medicineName) {

        Optional<Medicine> medicineOptional =
                medicineRepository.findByNameIgnoreCase(medicineName);

        if (medicineOptional.isEmpty()) {
            throw new RuntimeException("Medicine not found");
        }

        Medicine medicine = medicineOptional.get();

        List<Inventory> inventories =
                inventoryRepository.findByMedicineIdOrderByPriceAsc(medicine.getId());

        double lowestPrice = 0;
        int pharmacies = 0;
        boolean available = false;

        if (!inventories.isEmpty()) {

            lowestPrice = inventories.get(0).getPrice();

            pharmacies = inventories.size();

            available = inventories.stream()
                    .anyMatch(Inventory::getAvailable);
        }

        return MedicineComparisonResponse.builder()
                .medicineName(medicine.getName())
                .activeIngredient(medicine.getActiveIngredient())
                .dosage(medicine.getDosage())
                .dosageForm(medicine.getDosageForm())
                .manufacturer(medicine.getManufacturer())
                .category(medicine.getCategory())
                .lowestPrice(lowestPrice)
                .totalPharmacies(pharmacies)
                .available(available)
                .recommendationScore(100)
                .build();
    }

    public MedicineComparisonPairResponse compareMedicines(
            String searchedMedicineName,
            String alternativeMedicineName) {

        MedicineComparisonResponse searched =
                compareMedicine(searchedMedicineName);

        MedicineComparisonResponse alternative =
                compareMedicine(alternativeMedicineName);

        if (searched == null || alternative == null) {
            return null;
        }

        return MedicineComparisonPairResponse.builder()
                .searchedMedicine(searched)
                .alternativeMedicine(alternative)
                .build();
    }

    public BestAlternativeResponse getBestAlternative(String medicineName) {

        Optional<Medicine> medicineOptional =
                medicineRepository.findByNameIgnoreCase(medicineName);

        if (medicineOptional.isEmpty()) {
            return null;
        }

        Medicine searchedMedicine = medicineOptional.get();

        List<Medicine> alternatives =
                medicineRepository.findByActiveIngredientIgnoreCase(
                        searchedMedicine.getActiveIngredient());

        BestAlternativeResponse best = null;

        int highestScore = -1;

        for (Medicine medicine : alternatives) {

            // Skip the searched medicine itself
            if (medicine.getId().equals(searchedMedicine.getId())) {
                continue;
            }

            int score = calculateRecommendationScore(searchedMedicine, medicine);

            List<Inventory> inventories =
                    inventoryRepository.findByMedicineIdOrderByPriceAsc(
                            medicine.getId());

            if (inventories.isEmpty()) {
                continue;
            }

            Inventory inventory = inventories.get(0);

            if (score > highestScore) {

                highestScore = score;

                best = BestAlternativeResponse.builder()
                        .medicineName(medicine.getName())
                        .manufacturer(medicine.getManufacturer())
                        .activeIngredient(medicine.getActiveIngredient())
                        .recommendationScore(score)
                        .lowestPrice(inventory.getPrice())
                        .pharmacyName(inventory.getPharmacy().getName())
                        .city(inventory.getPharmacy().getCity())
                        .reason(generateRecommendationReason(
                                searchedMedicine,
                                medicine))
                        .build();
            }
        }

        return best;
    }

    public List<PharmacyResponse> getPharmacies(String medicineName) {

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

        List<PharmacyResponse> pharmacies = new ArrayList<>();

        for (Inventory inventory : inventories) {

            pharmacies.add(

                    PharmacyResponse.builder()

                            .pharmacyName(
                                    inventory.getPharmacy().getName()
                            )

                            .address(
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

                            .latitude(
                                    inventory.getPharmacy().getLatitude()
                            )

                            .longitude(
                                    inventory.getPharmacy().getLongitude()
                            )

                            .phoneNumber(
                                    inventory.getPharmacy().getPhoneNumber()
                            )

                            .email(
                                    inventory.getPharmacy().getEmail()
                            )

                            .rating(
                                    inventory.getPharmacy().getRating()
                            )

                            .openingTime(
                                    inventory.getPharmacy().getOpeningTime()
                            )

                            .closingTime(
                                    inventory.getPharmacy().getClosingTime()
                            )

                            .open24Hours(
                                    inventory.getPharmacy().getOpen24Hours()
                            )

                            .build()

            );

        }

        return pharmacies;

    }

    // Save medicine
    public Medicine saveMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    // Delete medicine
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }
}