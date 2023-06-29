import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../store";
import { Spinner, Table } from "flowbite-react";
import dayjs from "dayjs";


const AppointmentList = ({refreshList}) => {

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.value);
  const appointments = useSelector((state) => state.appointments?.list) || [];

  useEffect(() => {
    dispatch(appointmentsActions.getAppointmentByUser(authUser?.id));
  }, [dispatch, authUser?.id, refreshList]);

  // console.log(appointments);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Scheduling Date</Table.HeadCell>
            <Table.HeadCell>Sales Representative</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {appointments?.value?.map((appointment, index) => (
              <Table.Row
                key={appointment.id}
                className="bg-white text-xs dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>
                  {dayjs(appointment.createdAt).format("DD/MM")}
                </Table.Cell>
                <Table.Cell
                  className="whitespace-no-wrap front-medium text-gray-900 dark:text-white"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {appointment.name.toUpperCase()}
                </Table.Cell>
                <Table.Cell
                  className="px-3 py-3 sm:px-6 overflow-auto"
                  style={{ whiteSpace: "nowrap", maxWidth: "120px" }}
                >
                  {appointment.phone.join(" / ").toLocaleString("fr-FR")}
                </Table.Cell>
                <Table.Cell
                  className="px-3 py-3 sm:px-6  overflow-auto"
                  style={{ whiteSpace: "nowrap", maxWidth: "120px" }}
                >
                  {appointment.address.toLowerCase()}
                </Table.Cell>
                <Table.Cell>
                  {dayjs(appointment.date).format("DD/MM/YY, HH:mm")}
                </Table.Cell>
                <Table.Cell>{appointment.commercial}</Table.Cell>
                <Table.Cell>
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                      aria-hidden
                      className="absolute text-xs inset-0 bg-green-200 opacity-50 rounded-full"
                    ></span>
                    <span className="relative text-xs">
                      {appointment.status}
                    </span>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body> 

        </Table>
        {appointments?.loading && (
          <div className="text-center">
            <Spinner aria-label="Default status example" size="xs" />
          </div>
        )}
      </div>
    </>
  );
};
export { AppointmentList };
