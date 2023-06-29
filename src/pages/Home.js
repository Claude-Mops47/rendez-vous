import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import AppointmentAdd from "../appointment/AppointmentAdd";
import { AppointmentList } from "../appointment/AppointmentList";

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  const handleClose = ()=>{
    setRefreshList(true)
    setOpenModal(false)
  }


  return (
    <>
      <div className="flex flex-col item-center">
        <p className="text-x1 font-semibold leading-tight mb-4">
          Welcome Marketer
        </p>

      </div>

      <Button className="flex md:order-4" onClick={() => setOpenModal(true)}>
        Add Appointment
      </Button>

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Create new Appointment</Modal.Header>
          <Modal.Body>
            <AppointmentAdd closeModal={handleClose} />
          </Modal.Body>
        </Modal>
      <div className="w-full flex justify-center">

        <AppointmentList refreshList={refreshList}/>
      </div>
    </>
  );
}
