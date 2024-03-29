import { DarkThemeToggle, Navbar, Dropdown, Avatar } from "flowbite-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { Link } from "react-router-dom";

export default function DefaultNavbar() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.value);
  const logout = () => dispatch(authActions.logout());

  if (!auth) return null;
  const role = auth?.role;

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} to="/">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="https://flowbite.s3.amazonaws.com/logo.svg"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Linkuup Medical
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              alt={`${auth?.firstName}`}
              img="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">
              {auth?.firstName} {auth?.lastName}
            </span>
            <span className="block text-sm truncate font-medium">
              {auth?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
        </Dropdown>
      </div>

      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/">
          Home
        </Navbar.Link>

        {role === "Admin" && (
          <>
            <Navbar.Link as={Link} to="/manager">
              Manager
            </Navbar.Link>

            <Navbar.Link as={Link} to="/admin">
              Admin
            </Navbar.Link>
          </>
        )}
        <Navbar.Link as={Link} to="/about">
          About
        </Navbar.Link>
      </Navbar.Collapse>
      <DarkThemeToggle />
    </Navbar>
  );
}
