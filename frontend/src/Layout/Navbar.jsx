import React from "react";
import { FaBars } from "react-icons/fa";
import { BsMoon } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axiosInstance from "../api/axiosInstance";

export default function Dashboard(props) {
  const redirect = useNavigate();

  async function logout() {
    const res = await axiosInstance.get(`/user/logout`);
    if (res.data.success) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: res.data.message,
        showConfirmButton: true,
        timer: 3000,
      });
      redirect("/");
    } else {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: res.data.message,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <>
      <section>
        {/* TOP NAVBAR */}
        <div
          className="d-flex justify-content-between align-items-center px-4 py-3 shadow-sm"
          style={{
            backgroundColor: "#f8f9fa",
            background: " #161e31",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <NavLink to="/DashboardView" className="text-white">
              <FaBars className="fs-4" />
            </NavLink>

            <NavLink
              to="/DashboardView"
              className="fs-5 fw-semibold text-white text-decoration-none"
            >
              Dashboard
            </NavLink>
          </div>

          <div className="d-flex align-items-center gap-3">
            <BsMoon className="fs-5 text-light" />

            <button
              className="btn btn-outline-danger btn-sm px-3"
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        </div>

        <div
          className="px-4 py-2 "
          style={{
            backgroundColor: "#f8f9fa",
            background: " #161e31",
          }}
        >
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <NavLink to="/DashboardView" className="text-decoration-none">
                  Home
                </NavLink>
              </li>
              <li
                className="breadcrumb-item active fw-semibold text-primary"
                aria-current="page"
              >
                {" "}
                {props.title}
              </li>
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
}
