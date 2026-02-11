import axiosInstance from "../api/axiosInstance";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function VerifyOtp() {
  const { register, handleSubmit, reset } = useForm();
  const redirect = useNavigate();

  async function verifyOtp(data) {
    {
      try {
        const res = await axiosInstance.post(`/user/verifyotp`, data);
        console.log(res.data);

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
          reset();
          redirect("/login");
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
  }

  return (
    <div className="container-fluid bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-md-4 col-sm-8">
          <div
            className="card shadow-lg border-0"
            style={{ borderRadius: "14px" }}
          >
            <div
              className="text-center py-4 text-white"
              style={{
                background: "linear-gradient(90deg, #198754, #20c997)",
                borderRadius: "14px 14px 0 0",
              }}
            >
              <h4 className="mb-1">OTP Verification</h4>
            </div>

            <div className="card-body px-4 py-4">
              <form onSubmit={handleSubmit(verifyOtp)}>
                <div className="mb-4">
                  <label className="fw-semibold mb-2">OTP :</label>
                  <input
                    type="text"
                    className="form-control fw-normal"
                    placeholder="Enter OTP..."
                    maxLength={6}
                    {...register("otp", { required: true })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 fw-semibold"
                >
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
