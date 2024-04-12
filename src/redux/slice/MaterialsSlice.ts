import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from "../../axios";
import { StatusFetch } from "../interface/StatusFetch";
import {IMaterial} from "../interface/Materials/IMaterial";
import {IDeliveryLocation} from "../interface/Materials/IDeliveryLocation";
import {IMaterialFromLocation} from "../interface/Materials/IMaterialFromLlocation";

interface IMaterialsSliceState {
    materials: IMaterial[],
    material: IMaterial,
    deliveryLocation: IDeliveryLocation[],
    materialFromLocation: IMaterialFromLocation[],
    status: StatusFetch,
    error: string | null;
}

const initialState: IMaterialsSliceState = {
    materials: [],
    material: {
        id: 0,
        title: "",
        descriptionTitle: "",
        description: "",
        lastYear: "",
        features: "",
        slogan: "",
        Price_Over_300: 0,
        Price_Up_To_300: 0,
        Price_Up_To_100: 0,
        priceDescription: "",
        categoryId: "",
        parentMaterialId: null,
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
        sub: []
    },
    deliveryLocation: [],
    materialFromLocation: [],
    status: StatusFetch.LOADING,
    error: null
};

export const fetchMaterials = createAsyncThunk(
    'materials/fetchMaterials',
    async () => {
        try {
            const response = await axios.get('/api/materials');
            return response.data.message as IMaterial[];
        } catch (error) {
            throw error;
        }
    }
);

export const fetchDeliveryLocation = createAsyncThunk(
    'materials/fetchDeliveryLocation',
    async () => {
        try {
            const response = await axios.get('/api/deliverylocation');
            const data = response.data.message;
            return {locations: data.locations as IDeliveryLocation[], materialFromLocation: data.materialFromLocation as IMaterialFromLocation[]};
        } catch (error) {
            throw error;
        }
    }
);

const materialsSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        setMaterialById: (state, action:PayloadAction<{ id: number }>) =>{
            const workObj = state.materials.find(material => material.id === action.payload.id);
            if(workObj) state.material = workObj; else {
                state.materials.map(mat => {
                    if(mat.sub.length)
                        mat.sub.map(sub =>{
                            if(sub.id === action.payload.id) state.material = sub;
                        })
                })
            }
        },
        clearMaterials: (state) =>{
            state.material =  {
                id: 0,
                    title: "",
                    descriptionTitle: "",
                    description: "",
                    lastYear: "",
                    features: "",
                    slogan: "",
                    Price_Over_300: 0,
                    Price_Up_To_300: 0,
                    Price_Up_To_100: 0,
                    priceDescription: "",
                    categoryId: "",
                    parentMaterialId: null,
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
                    sub: []
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.materials = action.payload;
            })
            .addCase(fetchMaterials.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            })

            .addCase(fetchDeliveryLocation.pending, (state) => {
                state.status = StatusFetch.LOADING;
            })
            .addCase(fetchDeliveryLocation.fulfilled, (state, action) => {
                state.status = StatusFetch.SUCCESS;
                state.deliveryLocation = action.payload.locations;
                state.materialFromLocation = action.payload.materialFromLocation;
            })
            .addCase(fetchDeliveryLocation.rejected, (state, action) => {
                state.status = StatusFetch.FAILED;
                state.error = action.error.message ?? 'An error occurred.';
            })

    }
});

export const {setMaterialById, clearMaterials } = materialsSlice.actions;
export const MaterialsReducer = materialsSlice.reducer;
