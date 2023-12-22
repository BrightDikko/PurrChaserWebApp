package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "secondary_categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecondaryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "secondary_category_id")
    private Integer secondaryCategoryId;

    @Column(nullable = false, name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "primary_category_id", referencedColumnName = "primary_category_id")
    private PrimaryCategory primaryCategory;

    @OneToMany(mappedBy = "secondaryCategory")
    private List<TertiaryCategory> tertiaryCategories;

}
