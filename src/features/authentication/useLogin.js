import { login as loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),

    onSuccess: (user) => {
      toast.success("User successfully logged in.");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { login, isPending };
}

export default useLogin;
