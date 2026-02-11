import { BrowserRouter, Route, Routes } from "react-router-dom";

import SideMenuBar from "./Layout/SideBar";
import Navbar from "./Layout/Navbar";
import RecipeList from "./Components/RecipeList";
import CreateRecipe from "./Layout/CreateRecipe";
import Home from "./Components/Home";
import UserRegisterForm from "./Layout/UserRegisterForm";
import UserLogin from "./Layout/UserLogin";
import OtpVerify from "./Layout/OtpVerify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/style.css";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserRegisterForm />} />
          <Route path="/otpVerify" element={<OtpVerify />} />
          <Route path="/login" element={<UserLogin />} />
        </Routes>

        <section className="main-section">
          <Routes>
            <Route
              path="/dashboard"
              element={
                <>
                  <SideMenuBar /> <Navbar /> <Home />
                </>
              }
            />
            <Route
              path="/recipe/create"
              element={
                <>
                  <SideMenuBar /> <Navbar title="Create Recipe" /> <CreateRecipe />
                </>
              }
            />
            <Route
              path="/recipes"
              element={
                <>
                  <SideMenuBar /> <Navbar title="All Recipes" /> <RecipeList />
                </>
              }
            />
            <Route
              path="/recipe/:id"
              element={
                <>
                  <SideMenuBar /> <Navbar title="Recipe Details" /> <RecipeList />
                </>
              }
            />
          </Routes>
        </section>
      </BrowserRouter>
    </>
  );
}
