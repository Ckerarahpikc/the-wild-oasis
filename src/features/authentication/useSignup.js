import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signupApi({ email, password, fullName }),

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address."
      );
    },

    onError: (err) => {
      console.log(err);
      toast.success(
        "Could not create new account for this user. Try again later."
      );
    },
  });

  return { signup, isSigningUp };
}
