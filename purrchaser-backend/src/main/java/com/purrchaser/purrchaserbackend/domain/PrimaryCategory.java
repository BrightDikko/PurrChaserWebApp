package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "primary_categories")
@Getter
@Setter
@ToString
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

    @ToString.Exclude
    @OneToMany(mappedBy = "primaryCategory")
    private List<SecondaryCategory> secondaryCategories;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PrimaryCategory that = (PrimaryCategory) o;
        return Objects.equals(primaryCategoryId, that.primaryCategoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(primaryCategoryId);
    }
}
