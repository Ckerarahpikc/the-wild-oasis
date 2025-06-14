import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";

import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyle";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedAppLayout from "./ui/ProtectedAppLayout";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // info: this is the time it takes for the query to go from 'fresh' state --> 'stale' state which also means old, all this we can find in 'react query devtools', so again if we change the data on supabase the state becomes 'fresh' then after time (1min in our case) it will become 'stale' state, the main term is: 'when the state is `fresh` nothing will change it until it becomes `stale`, as soon as it becomes `stale` the data will change to the one from supabase (if there is one)'
      // staleTime: 60 * 1000,
      // staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedAppLayout>
                  <AppLayout />
                </ProtectedAppLayout>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path={"dashboard"} element={<Dashboard />} />
              <Route path={"bookings"} element={<Bookings />} />
              <Route path={"bookings/:bookingId"} element={<Booking />} />
              <Route path={"checkin/:bookingId"} element={<Checkin />} />
              <Route path={"cabins"} element={<Cabins />} />
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path={"dashboard"} element={<Dashboard />} />
              <Route path={"settings"} element={<Settings />} />
              <Route path={"users"} element={<Users />} />
              <Route path={"account"} element={<Account />} />
            </Route>
            <Route path={"login"} element={<Login />} />
            <Route path={"*"} element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
