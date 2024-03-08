import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "../../axios";
import { ICategory } from "../interface/ICategory";
import {StatusFetch} from "../interface/StatusFetch";
interface MaterialsSliceState {
    categories: ICategory[];
    status: StatusFetch
    error: string | null;
}

const initialState: MaterialsSliceState = {
    categories: [],
    status: StatusFetch.LOADING,
    error: null
};

export const fetchMaterials = createAsyncThunk(
    'materials/fetchMaterials',
    async () => {
        try {
            const response = await axios.get('/api/category');
            return response.data.message as ICategory[];
        } catch (error) {
            throw error;
        }
    }
);

const materialsSlice = createSlice({
    name: 'materials',
    initialState,
    reducers: {


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.categories = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            });
    }
});

export const { } = materialsSlice.actions;
export const MaterialsReducer = materialsSlice.reducer;
