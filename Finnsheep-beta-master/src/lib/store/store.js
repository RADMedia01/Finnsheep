import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from '@/app/lib/storageUtils';


// Load the persisted state from localStorage
const preloadedState = loadStateFromLocalStorage();

// store variable is a global variable.

// export const makeStore = () => {
//     return configureStore({
//         reducer: {
//             cart: cartReducer,
//         },
//     });
// };



// Function to create and configure the store
export const makeStore = () => {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
            // Add other reducers here if needed
        },
        preloadedState, // Pass the persisted state here
    });

    // Subscribe to store updates
    store.subscribe(() => {
        saveStateToLocalStorage({
            cart: store.getState().cart, // Save only the cart state or the entire state as needed
        });
    });

    return store;
};