import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../store";
import { Spinner, Table, TextInput } from "flowbite-react";
import dayjs from "dayjs";

const AppointmentList = ({ refreshList }) => {
  // Obtention de la date actuelle
  const currentDate = new Date();
  // Extraction des composants de la date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  // Formation de la date au format "yyyy-MM-dd"
  const formattedDate = `${year}-${month}-${day}`;

  const [selecteDate, setSelectedDate] = useState(formattedDate);

  // const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.value);
  const appointments =
    useSelector((state) => state.appointments?.list?.value) || [];

  const sortedAppointments = [...appointments];

  sortedAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };

  const useFetchAppointments = (date) => {
    const dispatch = useDispatch();
    const page = 1;
    const limit = 20;

    useEffect(() => {
      const fetchAppointments = async () => {
        if (date !== "") {
          await dispatch(
            appointmentsActions.getAppointmentByUser({
              id: authUser?.id,
              dateBlock: date,
              page: page,
              limit: limit,
            })
          );
        }
      };
      fetchAppointments();
    }, [dispatch,date, refreshList]);
  };

  useFetchAppointments(selecteDate);

  // console.log(appointments);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4">
          <TextInput
            className=" p-1 pl-10 text-sm text-gray-900  w-80  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            min='2023-01'
            value={selecteDate}
            onChange={handleDateChange}
          />

        </div>
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
            {sortedAppointments?.map((appointment, index) => (
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
            <Spinner aria-label="Default status example" size="xl" />
          </div>
        )}
      </div>
    </>
  );
};
export { AppointmentList };
