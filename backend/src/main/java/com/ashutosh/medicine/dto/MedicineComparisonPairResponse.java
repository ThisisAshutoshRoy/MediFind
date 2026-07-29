package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicineComparisonPairResponse {

    private MedicineComparisonResponse searchedMedicine;

    private MedicineComparisonResponse alternativeMedicine;

}