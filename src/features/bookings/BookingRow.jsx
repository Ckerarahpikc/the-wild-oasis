import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import { HiTrash } from "react-icons/hi";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const { isCheckingOut, checkout } = useCheckout();
  const { mutate: deleteBooking, isPending: isLoadingDeleteBooking } =
    useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();

  if (isCheckingOut || isLoadingDeleteBooking) return <Spinner />;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus>
          <Menus.Toggle id="booking-menus" />
          <Menus.List id="booking-menus">
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Arrived
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="deleteBooking">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            
          </Menus.List>

          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() => deleteBooking(bookingId)}
              disabled={isLoadingDeleteBooking}
            />
          </Modal.Window>
        </Menus>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
