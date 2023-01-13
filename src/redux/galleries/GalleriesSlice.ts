import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GalleriesState {
    galleries: any[];
}

const initialState: GalleriesState = {
    galleries: []
};

export const galleriesSlice = createSlice({
    name: 'galleries',
    initialState,
    reducers: {
        addGalleries: (state, action: PayloadAction<any>) => {
            state.galleries = [...action.payload];
        }
    }
});

export const { addGalleries } = galleriesSlice.actions;

export default galleriesSlice.reducer;
