import styled from "styled-components";
import { useNavigate, useNavigation } from "react-router-dom";
import { useEffect } from "react";

import LoginForm from "../features/authentication/LoginForm";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import { FullPageLoading } from "../ui/ProtectedAppLayout";

import useUser from "../features/authentication/useUser";
import toast from "react-hot-toast";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser();

  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    },
    [isAuthenticated, navigate]
  );

  if (isLoading)
    return (
      <FullPageLoading>
        <Spinner />
      </FullPageLoading>
    );

  return (
    <LoginLayout>
      <Logo />
      <Heading as="h2">Log in to you account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
