import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

function useDeleteCabin() {
  

  // info: I want to use 'useQueryClient' because I'd like to update my UI, so when the user delete an item we want to update or refresh the UI
  const queryClient = useQueryClient();

  // info: useMutation is used to 'update/delete/create' data or perform SSE
  // note: mutate is the actual function that we need to run in order to run a function 'mutationFn'
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin was successfully deleted.");

      // note: this 'invalidateQueries' can be called only on 'queryClient' and it's used to invalidate or refetch single or multiple queries in the cache
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleting, deleteCabin };
}

export default useDeleteCabin;
