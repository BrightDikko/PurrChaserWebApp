package com.purrchaser.purrchaserbackend.mapper;

import com.purrchaser.purrchaserbackend.domain.School;
import com.purrchaser.purrchaserbackend.dto.SchoolDTO;
import com.purrchaser.purrchaserbackend.service.SchoolService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SchoolMapper {
    private final SchoolService schoolService;

    public List<SchoolDTO> getAllSchools() {
        List<School> allSchools = schoolService.getAllSchools();

        List<SchoolDTO> schoolDTOS = new ArrayList<>();

        for (School school : allSchools) {
            SchoolDTO schoolDTO = convertToSchoolDTO(school);
            schoolDTOS.add(schoolDTO);
        }

        return schoolDTOS;
    }

    private SchoolDTO convertToSchoolDTO(School school) {
        return SchoolDTO.builder()
                .schoolId(school.getSchoolId())
                .name(school.getName())
                .emailFormat(school.getEmailFormat())
                .build();
    }
}
