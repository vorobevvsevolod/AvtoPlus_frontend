import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "../../axios";
import { ICategory } from "../interface/ICategory";
import {StatusFetch} from "../interface/StatusFetch";
interface MaterialsSliceState {
    categories: ICategory[];
    breadCrumbs: String[],
    activeCategory: string,
    status: StatusFetch
    error: string | null;
}

const initialState: MaterialsSliceState = {
    categories: [],
    breadCrumbs: [],
    activeCategory: "",
    status: StatusFetch.LOADING,
    error: null
};

export const fetchCategory = createAsyncThunk(
    'category/fetchCategory',
    async () => {
        try {
            const response = await axios.get('/api/category');
            return response.data.message as ICategory[];
        } catch (error) {
            throw error;
        }
    }
);

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setBreadCrumbs: (state, action: PayloadAction<String[]>) => {
            const newArray = [...action.payload];
            if (action.payload[0] === 'Галерея работ') {
                state.breadCrumbs = [];
                state.breadCrumbs[0] = action.payload[0];
            } else {
                state.categories.forEach(category => {
                    if (category.name === newArray[0]) {
                        state.activeCategory = category.id;
                        if (newArray.length > 1) {
                            category.sub.forEach(sub => {
                                if (String(sub.idSub) === newArray[newArray.length - 1]) {
                                    newArray.pop();
                                    newArray.push(sub.title);
                                    state.breadCrumbs = newArray;
                                }
                            });
                        } else state.breadCrumbs = newArray;
                    }
                });
            }


        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.activeCategory = action.payload;
        },

        setClearBreadCrumbs: (state) =>{

            state.breadCrumbs = [];
            state.activeCategory = "";
        },

        setDeleteLastItemBreadCrumbs: (state) =>{
            state.breadCrumbs.pop();
        }




    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategory.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchCategory.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                const categoriesArray = action.payload.map(cat =>
                {
                    return { ...cat, sub: cat.sub.sort((a,b) => a.idSub - b.idSub)}
                })
                state.categories = action.payload;
            })
            .addCase(fetchCategory.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            });
    }
});

export const {setBreadCrumbs, setClearBreadCrumbs,setDeleteLastItemBreadCrumbs,setActiveCategory } = categorySlice.actions;
export const CategoryReducer = categorySlice.reducer;
