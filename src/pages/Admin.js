import React from "react";
import { AppointmentAllList } from "../appointment/AppointmentAllList";

export default function AdminPage() {

  return (
    <>
      <div className="flex flex-col item-center">
        <p className="text-x1 font-semibold leading-tight mb-4 flex justify-center">
          Welcome Admin
        </p>
      </div>

      <div className="w-full  justify-center">
        <AppointmentAllList/>
      </div>
    </>
  );
}
