import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { appointmentsActions } from "../store";
import dayjs from "dayjs";
import DeleteButton from "../utils/buttonConfirm";

const AppointmentEdit = () => {
  const { id: appointmentId } = useParams();
  const dispatch = useDispatch();
  const appointment = useSelector((state) => state.appointments.item);

  const [appointmentData, setAppointmentData] = useState({
    date: dayjs(appointment?.date).format("YYYY-MM-DD HH:mm"),
    name: appointment?.name,
    status: appointment?.status,
    comment: appointment?.comment,
    address: appointment?.address,
    commercial: appointment?.commercial,

    phoneFixe: "",
    phoneMobile: "",
  });

  useEffect(() => {
    dispatch(appointmentsActions.getAppointmentById(appointmentId)).unwrap()
    .then((appointment)=>{
      appointmentForm.setValues({
        ...appointment
      })
    });
  }, [dispatch, appointmentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Récupérer les numéros de téléphone
    const {
      phoneFixe,
      phoneMobile,
      name,
      comment,
      commercial,
      date,
      address,
      status,
    } = appointmentData;

    const phone = [];
    if (phoneFixe && phoneFixe.length > 0) {
      phone.push(phoneFixe);
    }
    if (phoneMobile && phoneMobile.length > 0) {
      phone.push(phoneMobile);
    }

    // Exemple : Réinitialiser les champs
    setAppointmentData((prevState) => ({
      ...prevState,
      phoneFixe: "",
      phoneMobile: "",
    }));
    const updateData = { name, comment, commercial, date, address, phone, status };

    console.log(updateData);
  };
    console.log(appointment);

  const handleDelete = () => {
    // Logique de suppression à implémenter ici
    console.log('Supprimer');
  };

  const handleUpdate = () => {
    // Logique de mise à jour à implémenter ici
    
    console.log('Mettre à jour');
  };
  const handleCancel = () => {
    // Logique de mise à jour à implémenter ici
    console.log('Annulé');
  };

  return (
    <div className="bg-white border border-4 rounded-lg shadow relative m-10">

      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <h3 className="text-xl font-semibold">Edit appointment</h3>
      </div>
      <div className="flex items-start justify-between p-5 border-b rounded-t">
        <p className="text-sm">
          Rdv pris par {appointment?.posted_by?.firstName}
        </p>
      </div>

      <div className="p-6 space-y-6">
        <form action="#">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Status
              </label>
              <select
                type="text"
                name="status"
                value={appointmentData.status}
                onChange={handleInputChange}
                id="status"
                autoComplete="off"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="Confirmé">Confirmé</option>
                <option value="En Attente">En Attente</option>
                <option value="Annulé">Annulé</option>
                <option value="Pas Intéressé">Pas Intéressé</option>
                <option value="A Rappeler">A Rappeler</option>
                <option value="Date Eloignée">Date Eloignée</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="commercial"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Sales Representative
              </label>
              <select
                type="text"
                name="commercial"
                valvalue={appointmentData.commercial}
                onChange={handleInputChange}
                id="commercial"
                autoComplete="off"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
              >
                <option value="">Select Sales Representative</option>
                <option value="Annabelle Rodriguez">Annabelle Rodriguez</option>
                <option value="Benoît Chamboissier">Benoît Chamboissier</option>
                <option value="Freddy Tamboers">Freddy Tamboers</option>
                <option value="Julien Morel">Julien Morel</option>
                <option value="Théo Raymond">Théo Raymond</option>
                <option value="Aurore Diallo">Aurore Diallo</option>
                <option value="Simon Cadenne">Simon Cadenne</option>
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Appointment Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={appointmentData.name}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Appointment Date
              </label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                value={appointmentData.date}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone-fixe"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Phone (fixe)
              </label>
              <input
                type="text"
                name="phoneFixe"
                id="phone-fixe"
                value={appointmentData.phoneFixe}
                onChange={handleInputChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="phone-mobile"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Phone (mobile)
              </label>
              <input
                type="text"
                name="phoneMobile"
                vvalue={appointmentData.phoneMobile}
                onChange={handleInputChange}
                id="phone-mobile"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={appointmentData.address}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="comment"
                className="text-sm font-medium text-gray-900 block mb-2"
              >
                Appointment Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={appointmentData.comment}
                onChange={handleInputChange}
                rows="6"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="p-6 border-t border-gray-200 rounded-b">
        <button
          className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
          onClick={handleSubmit}
        >
          Save all
        </button>

        {/* <DeleteButton onDelete={handleDelete} onUpdate={handleUpdate} onCancel={handleCancel}/> */}
        <DeleteButton action='delete'/>
        <DeleteButton action='update'/>

      </div>
    </div>
  );
};

export default AppointmentEdit;

