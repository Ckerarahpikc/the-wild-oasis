import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get("sortBy") || options.at(0).value;

  function handleSorting(e) {
    searchParams.set("sortBy", e.target.value);

    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleSorting}
      value={currentValue}
      type="white"
    />
  );
}

export default SortBy;
