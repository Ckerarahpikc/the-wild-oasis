import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";

function useCabins() {
  // info: useQuery gets 2 parameters (array, function) (name/key of the query, function from where the data will come)
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
