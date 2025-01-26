import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    itemsProduct: [],
  },
  reducers: {
    addItems: (state, action) => {
  state.itemsProduct.push(action.payload)
    },
  },
});
export const { addItems } = itemsSlice.actions; 
export default itemsSlice.reducer;