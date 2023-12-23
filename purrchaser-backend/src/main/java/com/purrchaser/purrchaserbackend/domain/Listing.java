package com.purrchaser.purrchaserbackend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "listings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Listing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="listing_id")
    private Integer listingId;

    @Column(nullable = false, name = "created_at")
    private Timestamp createdAt;

    @Column(nullable = false, name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne
    @JoinColumn(name = "seller_id", referencedColumnName = "user_id")
    private ApplicationUser seller;

    @Column(nullable = false, name = "title")
    private String title;

    @Column(columnDefinition = "TEXT", name = "description")
    private String description;

    @Column(precision = 10, scale = 2, name = "price")
    private BigDecimal price;

    @Column(nullable = false, name = "is_sold")
    private Boolean isSold;

    @Column(name="item_condition")
    private String itemCondition;

    @Column(name="brand")
    private String brand;

    @Column(name="model")
    private String model;

    @OneToOne
    @JoinColumn(name = "main_image_id", referencedColumnName = "image_id")
    private Image mainImage;

    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "tertiary_category_id")
    private TertiaryCategory category;

    private String meetingLocation;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());;
        updatedAt = new Timestamp(System.currentTimeMillis());;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }
}
