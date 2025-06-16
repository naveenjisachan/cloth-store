import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSortOption } from "../features/contents/contentSlice";

const SortDropdown = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.content.sortOption);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="sort" style={{ marginRight: "0.5rem" }}>
        Sort by:
      </label>
      <select id="sort" value={selected} onChange={handleChange}>
        <option value="none">Select</option>
        <option value="name">Item Name (A–Z)</option>
        <option value="high">Higher Price</option>
        <option value="low">Lower Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
