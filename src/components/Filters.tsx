import { useDispatch, useSelector } from "react-redux";
import { setFilters, resetFilters } from "../features/contents/contentSlice";
import { RootState } from "../redux/store";

const options = ["Paid", "Free", "View Only"];

const Filters = () => {
  const dispatch = useDispatch();
  const selected = useSelector(
    (state: RootState) => state.content.selectedFilters
  );

  const toggleOption = (option: string) => {
    const updated = selected.includes(option)
      ? selected.filter((o) => o !== option)
      : [...selected, option];
    dispatch(setFilters(updated));
  };

  return (
    <div>
      <h3>Filters</h3>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggleOption(opt)}
          />
          {opt}
        </label>
      ))}
      <button onClick={() => dispatch(resetFilters())}>Reset</button>
    </div>
  );
};

export default Filters;
