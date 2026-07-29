package com.ashutosh.medicine.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "inventory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Medicine available
    @ManyToOne
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    // Pharmacy where medicine is available
    @ManyToOne
    @JoinColumn(name = "pharmacy_id", nullable = false)
    private Pharmacy pharmacy;

    // Selling price
    @Column(nullable = false)
    private Double price;

    // Current stock
    @Column(nullable = false)
    private Integer stock;

    // Whether this medicine is currently available
    @Column(nullable = false)
    private Boolean available;
}