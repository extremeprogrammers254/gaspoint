import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Product {
    id: string;
    brand: {
        id: string;
        name: string;
    };
    product_type: {
        id: string;
        name: string;
    };
    weight: {
        id: string;
        weight: string;
    };
    sold_as: {
        id: string;
        name: string;
    };
    name: string;
    price: number;
    description: string;
    date_added: string;
    image: string;
}



const apiUrl = 'http://127.0.0.1:8000'

type Status = "idle" | "loading" | "succeeded" | "failed";

interface ProductState {
    product: Product | null;
    status: Status;
    error: string | null | undefined;
}

const initialState: ProductState = {
    product: null,
    status: "idle",
    error: null,
}


export const fetchProduct = createAsyncThunk("product/fetchProduct", async (productId: string) => {
    

    // await new Promise((resolve) => setTimeout(resolve, 10000))
    const response = await axios.get(`${apiUrl}/details/${productId}`);
    return response.data;
});

const singleProductSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
},
extraReducers: (builder) => {
    builder

    .addCase(fetchProduct.pending, (state) => {
        state.status = "loading";
    })
    .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
        
    })
    .addCase(fetchProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
    })
}}
);

export const selectProduct = (state: {product: ProductState}) => state.product.product;
export const getSingleProductStatus = (state: {product: ProductState}) => state.product.status;
export const getSingleProductError = (state: {product: ProductState}) => state.product.error;

export default singleProductSlice.reducer;