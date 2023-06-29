import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { authActions } from "../store";
import { Button, Label, TextInput } from "flowbite-react";

const LoginPage = () => {
  const dispatch = useDispatch();

  const validationScheme = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    resolver: yupResolver(validationScheme)
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await dispatch(authActions.login({ email, password }));
    } catch (error) {
      console.log("Error during login:", error);
    }
  };

  return (
    <div className="mx-auto maw-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">LINKUUP MEDICAL</h1>
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
          <TextInput
            id="email"
            placeholder="name@gmail.com"
            type="email"
            required
            {...register("email")}
          />
        </div>

        <div className="mb-2 block">
          <Label htmlFor="password" value="Your password" />
          <TextInput
            id="password"
            type="password"
            required
            {...register("password")}
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
