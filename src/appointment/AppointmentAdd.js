import React, { useState } from "react";
import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { appointmentsActions } from "../store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import fr from "date-fns/locale/fr";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validationSchema = Yup.object().shape({
  date: Yup.date().required("La date est requise"),
  name: Yup.string().required("Le nom est requis"),
  address: Yup.string().required("L'adresse est requise"),
  commercial: Yup.string().required("Le commercial est requis"),
  comment: Yup.string(),
  phoneFixe: Yup.string(),
  phoneMobile: Yup.string(),
});

export default function AppointmentAdd({ closeModal }) {
  const [openModal, setOpenModal] = useState(false);
  const props = { openModal, setOpenModal };

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth?.value);

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      commercial: "",
      date: null,
      name: "",
      phoneFixe: "",
      phoneMobile: "",
      address: "",
      comment: "",
    },
  };

  const { register, handleSubmit, formState, watch, reset } = useForm(formOptions);
  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    const { phoneFixe, phoneMobile, name, comment, commercial, date, address } = data;
    const phone = [];
    if(phoneFixe && phoneFixe.length > 0){
      phone.push(phoneFixe)
    }
    if(phoneMobile && phoneMobile.length > 0){
      phone.push(phoneMobile)
    }

    const updateData = { name, comment, commercial, date, address, phone };
    await dispatch(
      appointmentsActions.createAppointment({
        id: authUser?.id,
        appointment: updateData,
      })
    );

    closeModal();
    reset();
  };

  const handleCancel = () => {
    reset();
    closeModal();
  };

  return (
    <>
      <div className="max-auto w-full ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <Label
                htmlFor="commercial"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Sales Representative
              </Label>
              <Select id="commercial" {...register("commercial")} required>
                <option value="">Select Sales Representative</option>
                <option value="Annabelle Rodriguez">Annabelle Rodriguez</option>
                <option value="Aurore Diallo">Aurore Diallo</option>
                <option value="Benoît Chamboissier">Benoît Chamboissier</option>
                <option value="Freddy Tamboers">Freddy Tamboers</option>
                <option value="Julien Morel">Julien Morel</option>
                <option value="Simom Cadenne">Simom Cadenne</option>
                <option value="Théo Raymond">Théo Raymond</option>
              </Select>
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <div className="mb-5">
                <Label
                  htmlFor="date_1"
                  className="mb-3 block text-base font-medium text-[#07074D]"
                >
                  Date and Time
                </Label>
                <DatePicker
                  id="date_1"
                  className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 rounded-lg p-2.5 text-sm"
                  isClearable
                  showIcon
                  selected={watch("date")}
                  onChange={(date) => {
                    reset({ date });
                  }}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  minTime={new Date().setHours(8, 0)}
                  maxTime={new Date().setHours(19, 0)}
                  dateFormat="PP à p"
                  locale={fr}
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <Label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Full Name
            </Label>
            <TextInput
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Full Name"
              {...register("name")}
            />
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3 sm:w-1/2">
              <Label
                htmlFor="phoneFixe"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Phone Fixe
              </Label>
              <TextInput
                type="text"
                name="phoneFixe"
                id="phoneFixe"
                autoComplete="off"
                placeholder="Fixe"
                {...register("phoneFixe")}
              />
            </div>
            <div className="w-full px-3 sm:w-1/2">
              <Label
                htmlFor="phoneMobile"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Phone Mobile
              </Label>
              <TextInput
                type="text"
                name="phoneMobile"
                id="phoneMobile"
                autoComplete="off"
                placeholder="Mobile"
                {...register("phoneMobile")}
              />
            </div>
          </div>

          <div className="mb-5">
            <Label
              htmlFor="address"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Address
            </Label>
            <TextInput
              type="text"
              name="address"
              autoComplete="off"
              id="address"
              placeholder="Casablanca, Maroc"
              {...register("address")}
            />
          </div>

          <div className="mb-5">
            <Label
              htmlFor="comment"
              className="mb-3 block text-base font-medium text-[#07074D]"
            >
              Comment
            </Label>
            <Textarea
              type="text"
              name="comment"
              id="comment"
              placeholder="Comment"
              {...register("comment")}
            />
          </div>

          <Modal.Footer>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? <Spinner className="Default status example"/> : "Save"}
            </Button>
            <Button color="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </div>
    </>
  );
}
