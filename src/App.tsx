import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContents,
  incrementVisibleCount,
} from "./features/contents/contentSlice";
import { RootState } from "./redux/store";
import Filters from "./components/Filters";
import SearchBox from "./components/SearchBox";
import ContentCard from "./components/ContentCard";
import SortDropdown from "./components/SortDropdown";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const contentState = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(getContents() as any);
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      dispatch(incrementVisibleCount());
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (contentState.status === "loading") return <p>Loading...</p>;
  if (contentState.status === "failed")
    return <p>Error: {contentState.error}</p>;

  const visibleItems = contentState.filtered.slice(
    0,
    contentState.visibleCount
  );

  return (
    <div style={{ padding: "1rem" }}>
      <SearchBox />
      <Filters />
      <SortDropdown />
      <div className="content-grid">
        {visibleItems.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {contentState.visibleCount < contentState.filtered.length && (
        <p style={{ textAlign: "center" }}>Loading more...</p>
      )}
    </div>
  );
}

export default App;
