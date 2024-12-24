import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Products {
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

interface ProductsState {
    products: Products[];
    status: Status;
    error: string | null | undefined;
    count: number;
    next: string | null;
    previous: string | null;
    currentPage: number;
}

const initialState: ProductsState = {
    products: [],
    status: "idle",
    error: null,
    count: 0,
    next: null,
    previous: null,
    currentPage: 1
}


export const fetchProducts = createAsyncThunk("products/fetchProducts", async ({page = 1} : {page: number;}) => {
    const pageSize = 8;
    const offset = (page - 1) * pageSize;

    // await new Promise((resolve) => setTimeout(resolve, 5000))
    const response = await axios.get(`${apiUrl}?offset=${offset}&page_size=${pageSize}`);
    return response.data;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers:{
},
extraReducers: (builder) => {
    builder

    .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.products = action.payload.results;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
    })
}}
);

export const selectAllProduct = (state: {products: ProductsState}) => state.products.products;
export const productCount = (state: {products: ProductsState}) => state.products.count;
export const getProductStatus = (state: {products: ProductsState}) => state.products.status;
export const getProductError = (state: {products: ProductsState}) => state.products.error;

export default productsSlice.reducer;