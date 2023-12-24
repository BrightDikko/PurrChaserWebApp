import {createSlice} from '@reduxjs/toolkit';

interface ListingsSliceState {
    allListings: any;
}

const initialState: ListingsSliceState = {
    allListings: {}
};

const listingsSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        setAllListings(state, action) {
            console.log("action: ", action);
            state.allListings = action.payload;
        },
    },
});

export const {setAllListings} = listingsSlice.actions;
export default listingsSlice.reducer;
