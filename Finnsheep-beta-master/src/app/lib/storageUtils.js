// storageUtils.js

export const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (e) {
        console.error("Could not save state to localStorage", e);
    }
};



// storageUtils.js

export const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state from localStorage", e);
        return undefined;
    }
};
