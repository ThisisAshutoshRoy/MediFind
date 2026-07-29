package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendationResponse {

    private String medicineName;

    private String manufacturer;

    private String activeIngredient;

    private String dosage;

    private String dosageForm;

    private String category;

    private Integer recommendationScore;

    private String recommendationReason;

    private Double price;

}