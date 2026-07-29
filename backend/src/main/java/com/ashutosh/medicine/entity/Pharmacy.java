package com.ashutosh.medicine.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalTime;

@Entity
@Table(name = "pharmacy")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pharmacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Example: Apollo Pharmacy
    @Column(nullable = false)
    private String name;

    // Full address
    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String city;

    // Google Maps latitude
    private Double latitude;

    // Google Maps longitude
    private Double longitude;

    // Contact number
    private String phoneNumber;

    // Contact email
    private String email;

    // Customer rating out of 5
    private Double rating;

    // Example: 09:00
    private LocalTime openingTime;
    private LocalTime closingTime;

    // True if open 24 hours
    private Boolean open24Hours;

}