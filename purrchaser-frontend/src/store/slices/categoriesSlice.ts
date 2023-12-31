import {createSlice} from '@reduxjs/toolkit';

export interface TertiaryCategory {
    tertiaryCategoryId: number;
    name: string;
}

export interface SecondaryCategory {
    secondaryCategoryId: number;
    name: string;
    tertiaryCategories: TertiaryCategory[];
}

export interface PrimaryCategory {
    primaryCategoryId: number;
    name: string;
    secondaryCategories: SecondaryCategory[];
}

interface CategoryPath {
    pathName: string;
    categoryName: string;
}

interface CategoryPaths {
    [key: string]: CategoryPath;
}

interface CategoriesSliceState {
    categories: PrimaryCategory[];
    categoryPaths: CategoryPaths
}

const initialState: CategoriesSliceState = {
    categories: [],
    categoryPaths: {}, // To hold processed category paths and slugs
};

export const formatCategoryNameLikeInHrefSlug = (categoryName: string) => {
    return encodeURIComponent(
        categoryName.toLowerCase().replace(/\s+/g, '-')
            .replace(/&/g, 'and') // Replace '&' with 'and'
    );
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action) {
            state.categories = action.payload;

            console.log("action.payload for categories: ", action.payload);

            // Process categories to create slugs and paths
            const categoryPaths: CategoryPaths = {};
            action.payload.forEach((primary: PrimaryCategory) => {
                primary.secondaryCategories.forEach(secondary => {
                    secondary.tertiaryCategories.forEach(tertiary => {
                        const slug = formatCategoryNameLikeInHrefSlug(tertiary.name);
                        categoryPaths[slug] = {
                            pathName: `${primary.name} / ${secondary.name} /`,
                            categoryName: tertiary.name,
                        };
                    });
                });
            });
            state.categoryPaths = categoryPaths;
        },
    },
});

export const {setCategories} = categoriesSlice.actions;
export default categoriesSlice.reducer;
