package com.ashutosh.medicine.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medicine")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String activeIngredient;

    @Column(nullable = false)
    private String dosage;

    @Column(nullable = false)
    private String dosageForm;

    private String manufacturer;

    private String category;

    @Column(length = 1000)
    private String description;

    @Column(length = 1000)
    private String sideEffects;

}