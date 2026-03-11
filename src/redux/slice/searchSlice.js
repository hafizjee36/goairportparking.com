// redux/slice/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchData: {
    airport: "",
    entryDate: "",
    entryTime: "",
    exitDate: "",
    exitTime: "",
    adults: 1,
    children: 0,
    discountCode: "",
    trafficSource: "",
  },
  hasSearched: false, 
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchField: (state, action) => {
      const { field, value } = action.payload;
      state.searchData[field] = value;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
      state.hasSearched = true; 
    },
    clearSearchData: (state) => {
      state.searchData = initialState.searchData;
      state.hasSearched = false;
    },
  },
});

export const { updateSearchField, setSearchData, clearSearchData } =
  searchSlice.actions;

export const selectSearchData = (state) => state.search.searchData;
export const selectHasSearched = (state) => state.search.hasSearched; // Make sure this exists

export default searchSlice.reducer;
