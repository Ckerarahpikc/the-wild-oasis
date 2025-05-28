import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Spinner from "./Spinner";

import useUser from "../features/authentication/useUser";

export const FullPageLoading = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedAppLayout({ children }) {
  const navigate = useNavigate();

  // 1. we need to get the session of the current user, if there is any
  const { isAuthenticated, isLoading } = useUser();

  // 2. if there's NO authenticated user redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // 3. if loading give loading
  if (isLoading)
    return (
      <FullPageLoading>
        <Spinner />
      </FullPageLoading>
    );

  // 4. otherwise return children, means therefor the route is indeed protected and the user is logged in

  return isAuthenticated ? children : null;
}

export default ProtectedAppLayout;
