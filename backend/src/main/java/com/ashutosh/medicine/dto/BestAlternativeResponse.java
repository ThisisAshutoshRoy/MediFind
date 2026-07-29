package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BestAlternativeResponse {

    private String medicineName;

    private String manufacturer;

    private String activeIngredient;

    private Integer recommendationScore;

    private Double lowestPrice;

    private String pharmacyName;

    private String city;

    private String reason;
}