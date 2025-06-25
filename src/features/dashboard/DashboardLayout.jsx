import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isPendingSales } = useRecentBookings();
  const { stays, confirmedStays, isPendingStays } = useRecentStays();

  if (isPendingSales || isPendingStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      {/* <Stats bookings={bookings} confirmedStays={confirmedStays} /> */}
      <div>Statistics</div>
      <div>Today&apos;s activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
