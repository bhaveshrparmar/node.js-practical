import React from "react";
import { SiSecurityscorecard } from "react-icons/si";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const SideMenuBar = () => {
  return (
    <>
      <div
        className="position-fixed top-0 start-0 vh-100 shadow-lg"
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #1f2937, #111827)",
        }}
      >
        <div
          className="d-flex align-items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <NavLink
            to="/DashboardView"
            className="text-decoration-none fw-semibold mt-2"
            style={{ color: "#38bdf8" }}
          >
            MY DASHBOARD
          </NavLink>
        </div>

        {/* MAIN LINK */}
        <div className="px-3 mt-3">
          <NavLink
            to="/DashboardView"
            className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none fw-semibold"
            style={{
              backgroundColor: "rgba(56,189,248,0.15)",
              color: "#e5e7eb",
            }}
          >
            <AiOutlineDashboard className="fs-5" />
            Dashboard
          </NavLink>
        </div>

        {/* SECTION TITLE */}
        <p
          className="text-uppercase fw-bold mt-4 mb-2 px-4"
          style={{ fontSize: "12px", color: "#9ca3af" }}
        >
          Components
        </p>

        {/* ACCORDION */}
        <div className="accordion px-2" id="accordionExample">
          {/* CATEGORY */}
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white rounded"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                <BiCategory className="fs-5 text-info" />
                <span className="mx-2 fw-semibold">Category</span>
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse">
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className=" px-4 py-2 d-block" to="/categoryadd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className=" px-4 py-2 d-block" to="/categoryView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* SUB CATEGORY */}
          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white rounded"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                <BiCategory className="fs-5 text-warning" />
                <span className="mx-2 fw-semibold">Sub Category</span>
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse">
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className=" px-4 py-2 d-block" to="/subcategory">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className=" px-4 py-2 d-block"
                      to="/subcategoryView"
                    >
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PRODUCT */}
          <div className="accordion-item bg-transparent border-0 mt-2">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed text-white rounded"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                <BiCategory className="fs-5 text-success" />
                <span className="mx-2 fw-semibold">Product</span>
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse">
              <div className="accordion-body p-0">
                <ul className="list-unstyled m-0">
                  <li>
                    <NavLink className=" px-4 py-2 d-block" to="/productAdd">
                      Add
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className=" px-4 py-2 d-block" to="/productView">
                      View
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenuBar;
