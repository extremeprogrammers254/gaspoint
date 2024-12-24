import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

const initialState: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.find(item => item.id === action.payload.id);
             if(existingItem) {
                existingItem.quantity += action.payload.quantity;
             } else {
                state.push(action.payload);
             }
             localStorage.setItem('cart', JSON.stringify(state));
        },
        removeItem: (state, action: PayloadAction<string>) => {
            const updatedState = state.filter(item => item.id !== action.payload);
            return updatedState;
        },
        clearCart: (state) => {
            localStorage.removeItem('cart');
            return [];
        }
    }
});

export const {addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;