import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1.
  const numBookings = bookings?.length;

  // 2.
  const sales = confirmedStays?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // 3.
  const checkins = confirmedStays?.length;

  // 4.
  const occupancyRate =
    confirmedStays?.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinsCount);

  console.log(cabinsCount);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="bookings"
        value={numBookings || 0}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="sales"
        value={formatCurrency(sales) || 0}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="check ins"
        value={checkins || 0}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={`${Math.round(occupancyRate * 100)}%`}
        color="yellow"
      />
    </>
  );
}

export default Stats;
