import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="modal-form">
        <Button size="medium" variation="primary">
          Create new cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="modal-form">
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens="table">
        <Button size="medium" variation="primary">
          Open Table
        </Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
}

// function AddCabin() {

//   return (
//     <div>
//       <Button
//         onClick={() => setIsOpenModal((state) => !state)}
//         size="medium"
//         variation="primary"
//       >Create new cabin</Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)}/>
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
