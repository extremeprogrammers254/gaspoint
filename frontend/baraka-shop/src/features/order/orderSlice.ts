import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


interface Order {
    id: string;
}

const apiUrl = 'http://127.0.0.1:8000';

type Status = "idle" | "loading" | "succeeded" | "failed";

interface OrderState {
    order: Order | null;
    status: Status;
    error: string | null | undefined;
}

const initialState: OrderState = {
    order: null,
    status: "idle",
    error: null
}

export const addOrder = createAsyncThunk(
    "order/addOrder",
    async ({orderData}:{orderData:any}) => {
        const response = await axios.post(`${apiUrl}/addorder/`, orderData);
        return response.data
    }
)

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
        .addCase(addOrder.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addOrder.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.order = action.payload;
        })
        .addCase(addOrder.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        })
    }
});

export const selectOrder = (state: {order:OrderState}) => state.order.order;
export const getOrderStatus = (state: {order: OrderState}) => state.order.status;
export const getOrderError = (state: {order: OrderState}) => state.order.error;

export default orderSlice.reducer;