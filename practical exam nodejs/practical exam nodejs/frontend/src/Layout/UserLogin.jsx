import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

export default function LoginForm() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  async function login(data) {
    try {
      const res = await axiosInstance.post(`/user/signin`, data);
      console.log(res);
      if (!res.data.success) {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
        redirect("/DashboardView");
        reset();
      }
    } catch (error) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: error.message,
        showConfirmButton: true,
        timer: 3000,
      });
    }
  }

  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-5 col-lg-4">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "16px" }}
          >
            <div className="text-center py-4 text-dark">
              <h4 className="mb-1">Login Your Account</h4>
            </div>

            <div className="card-body px-4 py-4">
              <form onSubmit={handleSubmit(login)}>
                <div className="mb-3">
                  <label className="fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    {...register("email")}
                  />
                </div>

                <div className="mb-4">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password..."
                    {...register("password")}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                >
                  Login
                </button>

                <div className="text-center">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <NavLink
                      to="/"
                      className="text-decoration-none fw-semibold"
                    >
                      Create Account
                    </NavLink>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
