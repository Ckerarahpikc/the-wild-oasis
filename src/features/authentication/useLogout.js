import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },

    onError: (err) => {
      toast.error(err);
    },
  });

  return { logout, isPending };
}

export default useLogout;
