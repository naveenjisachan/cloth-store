import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKeyword } from "../features/contents/contentSlice";
import { RootState } from "../redux/store";

const SearchBox = () => {
  const dispatch = useDispatch();
  const keyword = useSelector((state: RootState) => state.content.keyword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Search by title or user"
      value={keyword}
      onChange={handleChange}
      style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
    />
  );
};

export default SearchBox;
