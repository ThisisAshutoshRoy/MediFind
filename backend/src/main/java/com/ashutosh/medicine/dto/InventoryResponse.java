package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryResponse {

    private String pharmacyName;

    private String pharmacyAddress;

    private String city;

    private Double price;

    private Integer stock;

    private Boolean available;
}