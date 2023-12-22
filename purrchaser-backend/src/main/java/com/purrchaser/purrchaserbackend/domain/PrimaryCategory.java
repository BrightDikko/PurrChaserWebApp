package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "primary_categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrimaryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "primary_category_id")
    private Integer primaryCategoryId;

    @Column(nullable = false, name = "name")
    private String name;

    @OneToMany(mappedBy = "primaryCategory")
    private List<SecondaryCategory> secondaryCategories;

}
