import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFolderOpen, FaBoxOpen } from "react-icons/fa";
import { BiGitBranch } from "react-icons/bi";
import { GiTakeMyMoney } from "react-icons/gi";

export default function DashboardHome() {
  const [Cate, setCate] = useState([]);
  const [SubCate, setSubCate] = useState([]);
  const [Product, setProduct] = useState([]);
  const redirect = useNavigate();

  async function ShowCategoryCount() {
    try {
      const res = await axiosInstance.get(`/category`);
      setCate(res.data.records);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  async function ShowSubCategoryCount() {
    try {
      const res = await axiosInstance.get(`/subcategory`);
      setSubCate(res.data.records);
    } catch (err) {
      console.error("Error fetching subcategories:", err);
    }
  }

  async function ShowProductCount() {
    try {
      const res = await axiosInstance.get(`/product`);
      setProduct(res.data.records);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  useEffect(() => {
    ShowCategoryCount();
    ShowSubCategoryCount();
    ShowProductCount();
  }, []);

  let result = 0;
  for (let i = 0; i < Product.length; i++) {
    let finalPrice = Number(Product[i].p_price);
    result += finalPrice;
  }

  const stats = [
    {
      title: "Categories",
      bgColor: "#2983e3ff",
      loc: "categoryView",
      color: "white",
      icon: <FaFolderOpen />,
      count: Cate.length,
    },
    {
      title: "Subcategories",
      bgColor: "#6a28d5ff",
      loc: "subcategoryView",
      color: "white",
      icon: <BiGitBranch />,
      count: SubCate.length,
    },
    {
      title: "Products",
      bgColor: "#0ee17fff",
      loc: "productView",
      color: "white",
      icon: <FaBoxOpen />,
      count: Product.length,
    },
    {
      title: "Investments",
      bgColor: "#e27d2bff",
      loc: "productView",
      color: "white",
      icon: <GiTakeMyMoney />,
      count: "₹" + result,
    },
  ];

  return (
    <div className="container-fluid py-4 px-4">
      <div className="rounded-4 p-4">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-white">Admin Dashboard</h2>
        </div>
        <div className="row g-4 justify-content-center">
          {stats.map((item, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ cursor: "pointer" }}
              onClick={() => redirect(`/${item.loc}`)}
            >
              <div
                className="card h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "18px",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
              >
                <div className="card-body text-center p-4">
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: item.bgColor,
                      color: "white",
                      fontSize: "26px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h6 className="text-uppercase text-secondary fw-semibold">
                    {item.title}
                  </h6>

                  <h2 className="fw-bold text-white mt-2">{item.count}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
