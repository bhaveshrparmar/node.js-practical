import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  async function signup(data) {
    try {
      const res = await axiosInstance.post(`/user/signup`, data);

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
        redirect("/otpVerify");
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
        <div className="col-md-6 col-lg-5">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "16px" }}
          >
            <div className="text-center pt-3 text-dark">
              <h4 className="mb-1">Register Your Account</h4>
            </div>

            <div className="card-body px-4 py-4">
              <form onSubmit={handleSubmit(signup)}>
                <div className="mb-3">
                  <label className="fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    {...register("name")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    {...register("email")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-semibold">Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    {...register("mobile")}
                  />
                </div>

                <div className="mb-3">
                  <label className="fw-semibold">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Create a password"
                    {...register("password")}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                >
                  Register
                </button>

                <div className="text-center">
                  <span className="text-muted">Already have an account?</span>{" "}
                  <NavLink to="/login" className="fw-semibold">
                    Login
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
