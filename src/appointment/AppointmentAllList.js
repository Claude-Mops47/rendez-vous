import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../store";
import { Button, Spinner, Table, TextInput } from "flowbite-react";
import dayjs from "dayjs";

const AppointmentAllList = () => {
  // Obtention de la date actuelle
  const currentDate = new Date();
  // Extraction des composants de la date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  // Formation de la date au format "yyyy-MM-dd"
  const formattedDate = `${year}-${month}-${day}`;

  const [selecteDate, setSelectedDate] = useState(formattedDate);
  const [filterAgent, setFilterAgent] = useState("");

  const downloadRef = useRef(null);
  const appointments = useSelector((state) => state.appointments?.lists) || [];
 
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
  };
  
  const useFetchAppointments = (date) => {
    const dispatch = useDispatch();
    const page = 1;
    const limit = 30;
  
    useEffect(() => {
      const fetchAppointments = async () => {
        if (date !== "") {
          await dispatch(
            appointmentsActions.getAllAppointments({
              dateBlock: date,
              page: page,
              limit: limit,
            })
          );
        }
      };
      fetchAppointments();
    }, [dispatch, date]);
  };
  
  useFetchAppointments(selecteDate);

  const handleAgentFilterChange = (e) => {
    setFilterAgent(e.target.value);
  };

  const filteredAppointments = appointments?.value?.filter((item) => {
    if (
      filterAgent &&
      !item.posted_by?.firstName
        .toLowerCase()
        .includes(filterAgent.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  //   function download
  const downloadAsCSV = () => {
    const csvContent = [
      "Agent,Date,Name,Telephone,Address,Date programmation,Commercial",
      ...(appointments?.value || []).map((item) => {
        const phone = item.phone.join(" / ");
        const agent = item.posted_by?.firstName;
        return [
          agent,
          dayjs(item.createdAt).format("DD/MM/YY HH:mm"),
          item.name,
          phone,
          item.address,
          dayjs(item.date).format("DD/MM/YY HH:mm"),
          item.commercial,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${selecteDate}appointments.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4">
          <TextInput
            className=" p-1 pl-10 text-sm text-gray-900  w-80  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="date"
            value={selecteDate}
            onChange={handleDateChange}
          />

          <Button
            type="button"
            size='xs'
            color="light"
            ref={downloadRef}
            onClick={downloadAsCSV}
          >
            download as CSV
          </Button>

          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </div>
            <TextInput
              id="search"
              type="text"
              className="block p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Filter by agent"
              autoComplete="off"
              value={filterAgent}
              onChange={handleAgentFilterChange}
            />
          </div>
        </div>

        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Agent</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Full Name</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Scheduling Date</Table.HeadCell>
            <Table.HeadCell>Sales Representative</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y"  >
            {filteredAppointments?.sort((a,b)=> new Date(b.createdAt)- new Date(a.createdAt))
            .map((appointment, index) => (
              <Table.Row 
                key={appointment.id}
                className="bg-white text-xs dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell
                  style={{ whiteSpace: "nowrap", maxWidth: "2px" }}
                  className="whitespace-no-wrap front-medium text-gray-900 dark:text-white"
                >
                  {appointment.posted_by?.firstName}
                </Table.Cell>

                <Table.Cell style={{ whiteSpace: "nowrap", maxWidth: "2px" }}>
                  {dayjs(appointment.createdAt).format("DD/MM")}
                </Table.Cell>
                <Table.Cell
                  className="whitespace-no-wrap front-medium text-gray-900 dark:text-white px-3 py-3 sm:px-4 overflow-auto"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {appointment.name.toUpperCase()}
                </Table.Cell>
                <Table.Cell
                  className="px-3 py-3 sm:px-4 overflow-auto"
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
                <Table.Cell
                  className="px-3 py-3 sm:px-6  overflow-auto"
                  style={{ whiteSpace: "nowrap", maxWidth: "100px" }}
                >
                  {appointment.commercial}
                </Table.Cell>
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
                <Table.Cell>
                  <a
                    className="fornt-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href={`./edit/${appointment._id}`}
                  >
                    <p>Edit</p>
                  </a>
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

export { AppointmentAllList };
