package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.PrimaryCategory;
import com.purrchaser.purrchaserbackend.domain.SecondaryCategory;
import com.purrchaser.purrchaserbackend.domain.TertiaryCategory;
import com.purrchaser.purrchaserbackend.dto.PrimaryCategoryDTO;
import com.purrchaser.purrchaserbackend.dto.SecondaryCategoryDTO;
import com.purrchaser.purrchaserbackend.dto.TertiaryCategoryDTO;
import com.purrchaser.purrchaserbackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CategoryMapper {
    private final CategoryService categoryService;

    public List<PrimaryCategoryDTO> getAllCategories() {
        List<PrimaryCategory> allPrimaryCategories = categoryService.getAllCategories();

        List<PrimaryCategoryDTO> allCategories = new ArrayList<>();

        for (PrimaryCategory primaryCategory : allPrimaryCategories) {
            PrimaryCategoryDTO primaryCategoryDTO = PrimaryCategoryDTO.builder()
                    .primaryCategoryId(primaryCategory.getPrimaryCategoryId())
                    .name(primaryCategory.getName())
                    .secondaryCategories(convertToSecondaryCategoryDTOs(primaryCategory.getSecondaryCategories()))
                    .build();

            allCategories.add(primaryCategoryDTO);
        }

        return allCategories;
    }

    public List<SecondaryCategoryDTO> convertToSecondaryCategoryDTOs(List<SecondaryCategory> secondaryCategories) {

        List<SecondaryCategoryDTO> secondaryCategoryDTOS = new ArrayList<>();

        for (SecondaryCategory secondaryCategory : secondaryCategories) {
            SecondaryCategoryDTO secondaryCategoryDTO = SecondaryCategoryDTO.builder()
                    .secondaryCategoryId(secondaryCategory.getSecondaryCategoryId())
                    .name(secondaryCategory.getName())
                    .tertiaryCategories(convertToTertiaryCategoryDTOs(secondaryCategory.getTertiaryCategories()))
                    .build();

            secondaryCategoryDTOS.add(secondaryCategoryDTO);
        }

        return secondaryCategoryDTOS;
    }

    public List<TertiaryCategoryDTO> convertToTertiaryCategoryDTOs(List<TertiaryCategory> tertiaryCategories) {

        List<TertiaryCategoryDTO> tertiaryCategoryDTOS = new ArrayList<>();

        for (TertiaryCategory tertiaryCategory : tertiaryCategories) {
            TertiaryCategoryDTO tertiaryCategoryDTO = TertiaryCategoryDTO.builder()
                    .tertiaryCategoryId(tertiaryCategory.getTertiaryCategoryId())
                    .name(tertiaryCategory.getName())
                    .build();
            tertiaryCategoryDTOS.add(tertiaryCategoryDTO);
        }

        return tertiaryCategoryDTOS;
    }
}
