import React, { useContext, useState } from "react";
import { Button, Modal } from "flowbite-react";
import AppointmentAdd from "../appointment/AppointmentAdd";
import { AppointmentList } from "../appointment/AppointmentList";
import { ThemeContext } from "../components/ThemeProvider";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleClose = () => {
    setRefreshList(true);
    setOpenModal(false);
  };

  return (
    <>
      <div className="flex flex-col item-center">
        <p className="text-x1 font-semibold leading-tight mb-4 flex justify-center">
          Welcome Marketer
        </p>
      </div>

      <div className="w-full flex justify-center py-12">
        <Button className="flex md:order-4" onClick={() => setOpenModal(true)}>
          Add Appointment
        </Button>
      </div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new Appointment</Modal.Header>
        <Modal.Body>
          <AppointmentAdd closeModal={handleClose} />
        </Modal.Body>
      </Modal>

      <div className="w-full  justify-center">
        <AppointmentList refreshList={refreshList} />
      </div>
    </>
  );
}
