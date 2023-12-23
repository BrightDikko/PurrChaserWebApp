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
@Table(name = "tertiary_categories")
@Getter
@Setter
@ToString
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TertiaryCategory that = (TertiaryCategory) o;
        return Objects.equals(tertiaryCategoryId, that.tertiaryCategoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tertiaryCategoryId);
    }
}
