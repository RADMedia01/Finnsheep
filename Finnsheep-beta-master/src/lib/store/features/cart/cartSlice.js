import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart ',
  initialState,
  reducers: {
        add: (state,action) => {
            // state.items = [...state.items, action.payload]

            // state.items.push(action.payload);

            const itemIndex = state.items.findIndex(item => item._id === action.payload._id);
            if (itemIndex >= 0) {
              // Item already exists in the cart
              state.items[itemIndex].quantity += action.payload.quantity;
            } else {
              state.items.push(action.payload);
            }
        },
        remove: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload._id);
          },
          updateQuantity: (state, action) => {
            const { productId, quantity } = action.payload;
            const item = state.items.find(item => item._id === productId); // Ensure this matches the correct product
            if (item) {
                item.quantity = quantity;
            }
        },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, updateQuantity   } = cartSlice.actions

export default cartSlice .reducer