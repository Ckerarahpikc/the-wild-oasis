import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDataForm } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (userData) => updateUserDataForm(userData),

    onSuccess: ({ user }) => {
      if (user) {
        queryClient.invalidateQueries(["user"]);
        toast.success("User account successfully updated");
      }
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { updateUser, isPending };
}

export default useUpdateUser;
