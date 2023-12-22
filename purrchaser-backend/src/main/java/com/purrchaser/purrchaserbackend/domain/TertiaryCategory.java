package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "tertiary_categories")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TertiaryCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tertiary_category_id")
    private Integer tertiaryCategoryId;

    @Column(nullable = false, name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "secondary_category_id", referencedColumnName = "secondary_category_id")
    private SecondaryCategory secondaryCategory;

    @OneToMany(mappedBy = "category")
    private List<Listing> listings;

}
