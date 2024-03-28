import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "../../axios";
import { ICategory } from "../interface/ICategory";
import { StatusFetch } from "../interface/StatusFetch";
import { IPriceFactor } from "../interface/Works/IPriceFactor";
import { INeed } from "../interface/Works/INeed";
import { IImages } from "../interface/Works/IImages";
import {IWork} from "../interface/Works/IWork";
import {IGalleryWorks} from "../interface/Works/IGalleryWorks";

interface IWorksSliceState {
    works: IWork[],
    work: IWork,
    galleryWorks: IGalleryWorks[],
    status: StatusFetch,
    error: string | null;
}

const initialState: IWorksSliceState = {
    works: [],
    work: {
        id: 0,
        title: "",
        descriptionTitle: "",
        description: "",
        lastYear: "",
        features: "",
        slogan: "",
        price: "",
        priceDescription: "",
        categoryId: "",
        priceFactor: {
            workId: 0,
            list: [{
                id: "",
                name: ""
            }]
        },
        need: {
            title:"",
            description: "",
            workId: 0,
            list: [{
                id: "",
                name:"",
                description:""
            }]
        },
        images: [],
    },
    galleryWorks: [],
    status: StatusFetch.LOADING,
    error: null
};

export const fetchWorks = createAsyncThunk(
    'works/fetchWorks',
    async () => {
        try {
            const response = await axios.get('/api/works');
            return response.data.message as IWork[];
        } catch (error) {
            throw error;
        }
    }
);

export const fetchGalleryWorks = createAsyncThunk(
    'works/fetchGalleryWorks',
    async () => {
        try {
            const response = await axios.get('/api/galleryworks');
            return response.data.message as IGalleryWorks[];
        } catch (error) {
            throw error;
        }
    }
);

const worksSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        setWorkById: (state, action:PayloadAction<{ id: number }>) =>{
            const workObj = state.works.find(work => work.id === action.payload.id);
            if(workObj) state.work = workObj;
        },
        clearWork: (state) =>{
            state.work =  {
                id: 0,
                    title: "",
                    descriptionTitle: "",
                    description: "",
                    lastYear: "",
                    features: "",
                    slogan: "",
                    price: "",
                    priceDescription: "",
                    categoryId: "",
                    priceFactor: {
                    workId: 0,
                        list: [{
                        id: "",
                        name: ""
                    }]
                },
                need: {
                    title:"",
                        description: "",
                        workId: 0,
                        list: [{
                        id: "",
                        name:"",
                        description:""
                    }]
                },
                images: [],
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWorks.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchWorks.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.works = action.payload;
            })
            .addCase(fetchWorks.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            })


            .addCase(fetchGalleryWorks.pending, (state) => {
                    state.status = StatusFetch.LOADING;
                })
            .addCase(fetchGalleryWorks.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.galleryWorks = action.payload;
            })
            .addCase(fetchGalleryWorks.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            });
    }
});

export const {setWorkById, clearWork } = worksSlice.actions;
export const WorksReducer = worksSlice.reducer;
