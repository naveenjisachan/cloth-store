export const applyFilters = (
  data: any[],
  filters: string[],
  keyword: string,
  sortOption: "none" | "name" | "high" | "low"
) => {
  const pricingMap: { [key: number]: string } = {
    0: "Paid",
    1: "Free",
    2: "View Only",
  };

  const keywordLower = keyword.toLowerCase();

  let results = data.filter((item) => {
    const title = item.title || "";
    const creator = item.creator || "";
    const pricingLabel = pricingMap[item.pricingOption];

    const matchesFilter =
      filters.length === 0 || filters.includes(pricingLabel);

    const matchesKeyword =
      title.toLowerCase().includes(keywordLower) ||
      creator.toLowerCase().includes(keywordLower);

    return matchesFilter && matchesKeyword;
  });

  if (sortOption === "name") {
    results.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "high") {
    results.sort((a, b) => b.price - a.price);
  } else if (sortOption === "low") {
    results.sort((a, b) => a.price - b.price);
  }

  return results;
};
