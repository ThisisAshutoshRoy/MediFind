package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineComparisonResponse {

    private String medicineName;

    private String activeIngredient;

    private String dosage;

    private String dosageForm;

    private String manufacturer;

    private String category;

    private Double lowestPrice;

    private Integer totalPharmacies;

    private Boolean available;

    private Integer recommendationScore;
}