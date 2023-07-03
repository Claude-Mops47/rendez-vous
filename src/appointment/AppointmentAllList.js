import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../store";
import { Button, Spinner, Table, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRangePicker } from "react-date-range";
import {formatSelectedDate} from '../utils/dateUtils'
import {downloadAsCSV} from '../utils/csvUtils'

const AppointmentAllList = () => {
  const appointments = useSelector((state) => state.appointments?.lists) || [];
  const downloadRef = useRef(null);

  // console.log(appointments);

  const [filterAgent, setFilterAgent] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleDate, setTitleDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "date",
    },
  ]);

  const handleDateChange = (ranges) => {
    setSelectedDate([ranges.date]);
  };

  const handleButtonClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerClose = () => {
    setShowDatePicker(false);
  };

  const dispatch = useDispatch();

  const fetchAppointments = (s_date, e_date) => {
    const page = 1;
    const limit = 100;

    dispatch(
      appointmentsActions.getAllAppointments({
        startDate: s_date,
        endDate: e_date,
        page: page,
        limit: limit,
      })
    );
  };

 useEffect(() => {
  if (selectedDate.length > 0) {
    const startDate = formatSelectedDate(selectedDate[0].startDate);
    const endDate = formatSelectedDate(selectedDate[0].endDate);

    fetchAppointments(startDate, endDate);
    setTitleDate(endDate)
  }
}, [dispatch, selectedDate]);

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

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4">
          <div>
            <Button color="gray" size="xs" onClick={handleButtonClick}>
            Select a date range
            </Button>
            {showDatePicker && (
              <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
                <div className="modal modal-open">
                  <div className="modal-box">
                    <div className="modal-header">
                      <Button
                        className="mt-4"
                        size="xs"
                        onClick={handleDatePickerClose}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M12.707 12.707a1 1 0 0 1-1.414 0L8 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L6.586 8l-3.293-3.293a1 1 0 0 1 1.414-1.414L8 6.586l3.293-3.293a1 1 0 0 1 1.414 1.414L9.414 8l3.293 3.293a1 1 0 0 1 0 1.414z"
                          />
                        </svg>
                      </Button>
                    </div>
                    <div className="modal-content">
                      <DateRangePicker
                        ranges={selectedDate}
                        onChange={handleDateChange}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        renderStaticRangeLabel={({ startDate, endDate }) =>
                          `${formatSelectedDate(
                            startDate
                          )} - ${formatSelectedDate(endDate)}`
                        }

                      />
                      <Button
                        className="mt-4"
                        size="xs"
                        onClick={handleDatePickerClose}
                      >
                        Fermer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            size="xs"
            color="light"
            ref={downloadRef}
            onClick={()=>downloadAsCSV(appointments, titleDate)}
          >
            download as CSV
          </Button>

          <div className="text-gray-600">Count: {appointments.value.length}</div>

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

          <Table.Body className="divide-y">
            {filteredAppointments
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
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
                  <Table.Cell className="fornt-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    <Link to={`../appointments/edit/${appointment._id}`}>
                      Edit
                    </Link>
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

export { AppointmentAllList };
