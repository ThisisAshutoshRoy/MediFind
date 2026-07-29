package com.ashutosh.medicine.dto;

import lombok.*;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PharmacyResponse {

    private String pharmacyName;

    private String address;

    private String city;

    private Double price;

    private Integer stock;

    private Boolean available;

    private Double latitude;

    private Double longitude;

    private String phoneNumber;

    private String email;

    private Double rating;

    private LocalTime openingTime;

    private LocalTime closingTime;

    private Boolean open24Hours;
}