package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "secondary_categories")
@Getter
@Setter
@ToString
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

    @ToString.Exclude
    @OneToMany(mappedBy = "secondaryCategory")
    private List<TertiaryCategory> tertiaryCategories;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SecondaryCategory that = (SecondaryCategory) o;
        return Objects.equals(secondaryCategoryId, that.secondaryCategoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(secondaryCategoryId);
    }
}
