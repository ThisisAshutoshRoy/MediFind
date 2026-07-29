package com.ashutosh.medicine.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardStatsResponse {

    // Existing statistics
    private Long medicines;

    private Long pharmacies;

    private Long inventory;

    private Long admins;

    // New statistics
    private Long availableInventory;

    private Long outOfStock;

    private Long lowStock;

    private Double averagePrice;

}