import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin(callback) {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: (newCabinData, id) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries(["cabins"]);
      callback({
        name: "",
        maxCapacity: "",
        regularPrice: "",
        discount: "",
        description: "",
        image: null,
      });
    },
    onError: (err) => {
      toast.error(err.message, { duration: 5000 });
    },
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
