import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchContentData } from "./contentAPI";
import { applyFilters } from "./filterUtils";

interface ContentState {
  data: any[];
  filtered: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedFilters: string[];
  keyword: string;
  visibleCount: number;
  sortOption: "none" | "name" | "high" | "low";
}

export const getContents = createAsyncThunk("content/getContents", async () => {
  const data = await fetchContentData();
  return data;
});

interface ContentState {
  data: any[];
  filtered: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedFilters: string[];
  keyword: string;
}

const initialState: ContentState = {
  data: [],
  filtered: [],
  status: "idle",
  error: null,
  selectedFilters: [],
  keyword: "",
  visibleCount: 20,
  sortOption: "none",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.selectedFilters = action.payload;
      state.filtered = applyFilters(
        state.data,
        state.selectedFilters,
        state.keyword,
        state.sortOption
      );
    },
    setKeyword(state, action) {
      state.keyword = action.payload;
      state.filtered = applyFilters(
        state.data,
        state.selectedFilters,
        state.keyword,
        state.sortOption
      );
    },
    setSortOption(state, action) {
      state.sortOption = action.payload;
      state.filtered = applyFilters(
        state.data,
        state.selectedFilters,
        state.keyword,
        state.sortOption
      );
    },
    resetFilters(state) {
      state.selectedFilters = [];
      state.keyword = "";
      state.sortOption = "none";
      state.filtered = applyFilters(state.data, [], "", "none");
    },
    incrementVisibleCount(state) {
      state.visibleCount += 10;
    },
    applyFilters(state) {
      const filters = state.selectedFilters;
      const keyword = state.keyword.toLowerCase();
      const pricingMap: { [key: number]: string } = {
        0: "Paid",
        1: "Free",
        2: "View Only",
      };

      let results = state.data.filter((item) => {
        const title = item.title || "";
        const creator = item.creator || "";
        const pricingLabel = pricingMap[item.pricingOption];

        const matchesFilter =
          filters.length === 0 || filters.includes(pricingLabel);

        const matchesKeyword =
          title.toLowerCase().includes(keyword) ||
          creator.toLowerCase().includes(keyword);

        return matchesFilter && matchesKeyword;
      });
      if (state.sortOption === "name") {
        results.sort((a, b) => a.title.localeCompare(b.title));
      } else if (state.sortOption === "high") {
        results.sort((a, b) => b.price - a.price);
      } else if (state.sortOption === "low") {
        results.sort((a, b) => a.price - b.price);
      }
      state.filtered = results;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getContents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filtered = action.payload;
      })
      .addCase(getContents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      });
  },
});

export const {
  setFilters,
  setKeyword,
  resetFilters,
  incrementVisibleCount,
  setSortOption,
} = contentSlice.actions;
export default contentSlice.reducer;
