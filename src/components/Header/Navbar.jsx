/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import axios from "axios";

import logo2 from "/src/assets/logo final .png";
import { useContext, useEffect, useState } from "react";
import { Url } from "../../url";
import NavMainCategory from "./NavMainCategory";
import "./Navbar.css";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import LoginPage from "../Login/Register/Login_Register";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IoSearch } from "react-icons/io5";
import { Modal, ModalBody } from "react-bootstrap";
import Toggle from "../Theme/Toggle";
import { ThemeDataContext } from "../Theme/Theme";

function MyNavbar() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const theme = useContext(ThemeDataContext);
  const params = useParams();

  const token = Cookies.get("token");

  const [showLogin, setShowLogin] = useState(false);

  const location = useLocation();

  const [search, setSearch] = useState("");
  const [smShow, setSmShow] = useState(false);

  const [active, setActive] = useState(
    sessionStorage.getItem("activeItem") || "home"
  );
  const [scrollvalue, setScrollvalue] = useState(false);

  const throttle = (callback, delay) => {
    let lastCall = 0;
    return function () {
      const now = new Date().getTime();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback.apply(null, arguments);
      }
    };
  };

  const handleScroll = throttle(() => {
    const scrollY = window.scrollY;
    const threshold = 150;
    setScrollvalue(scrollY >= threshold);
  }, 100);
  // Attach scroll event listener when component mounts

  let userComponent;

  if (!token || typeof token !== "string") {
    userComponent = (
      <button
        type="button"
        className="mx-3 btn btn-light"
        onClick={() => setShowLogin(true)}
      >
        Login
      </button>
    );
  } else {
    try {
      const decode = jwtDecode(token);
      if (decode.email) {
        userComponent = (
          <div className="dropdown mx-3">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <FaUser /> <span className="ms-3">USER</span>
            </button>
            <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
              {/* <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li> */}
              <li>
                <Link className="dropdown-item" to="/admin">
                  Admin
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    Cookies.remove("token");
                    localStorage.removeItem("userType");
                    navigate("/");
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        );
      } else {
        userComponent = (
          <button
            type="button"
            className="mx-3 btn btn-light"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
        );
      }
    } catch (err) {
      userComponent = (
        <button
          type="button"
          className="mx-3 btn btn-light"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
      );
    }
  }

  const mainCategory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}api/category/categoryList`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  if (Object.keys(params).length === 0) {
    sessionStorage.setItem("activeItem", "home");
  }
  const handlecloseLogin = () => setShowLogin(false);

  useEffect(() => {
    mainCategory();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Main_Category = data
    .filter((item) => item.show_on_menu == 1)
    .map((item) => (
      <NavMainCategory
        item={item}
        key={item.id}
        active={active}
        setActive={setActive}
      />
    ));

  return (
    <div
      className={scrollvalue ? "position-Nav" : "position-Nav-nosticky"}
      style={{ fontFamily: '"Poppins", Helvetica, sans-serif' }}
    >
      <nav
        className={
          theme.theme
            ? "navbar shadow navbar-expand-lg navbar-light bg-light nav-details"
            : "navbar shadow navbar-expand-lg navbar-dark bg-dark nav-details"
        }
      >
        {!scrollvalue ? (
          <div className="d-flex flex-column">
            <div className="d-flex justify-content-center">
              <Link to="/" className="navbar-brand">
                <img
                  src={logo2}
                  className="img-fluid mx-3"
                  alt="Responsive image"
                  width="110px"
                />
              </Link>
            </div>
            <div>
              <div
                className="collapse py-2 navbar-collapse nav-list__bg-red"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={
                        active == "home"
                          ? "nav-link border_bottom nav-home_btn active-nav mx-2 "
                          : "nav-link border_bottom mx-2"
                      }
                      onClick={() => {
                        setActive("home");
                        sessionStorage.setItem("activeItem", "home");
                      }}
                    >
                      Home
                    </Link>
                  </li>
                  {Main_Category}
                  {/* <li className="nav-item dropdown mx-1 ">
                  <a
                    className={
                      active == "more"
                        ? "nav-link border_bottom dropdown-toggle active-nav "
                        : "nav-link dropdown-toggle border_bottom "
                    }
                    href="#"
                    onClick={() => {
                      setActive("more");
                    }}
                  >
                    More
                  </a>
                  <div className="dropdown-menu">
                    <Link to ="/newsletter" className="dropdown-item" href="#">
                     NewsLetter
                    </Link>
                    
                  </div>
                </li> */}
                  <li className="nav-item">
                    <Link
                      to="/newsletter"
                      style={{ backgroundColor: "#0192ef", color: "white" }}
                      className={
                        active == "newsletter"
                          ? "nav-link border_bottom nav-home_btn active-nav mx-2 "
                          : "nav-link border_bottom mx-2"
                      }
                      onClick={() => {
                        setActive("newsletter");
                        sessionStorage.setItem("activeItem", "newsletter");
                      }}
                    >
                      E-magazine
                    </Link>
                  </li>
                </ul>
                <div className="d-flex ms-auto align-items-center justify-content-between">
                  <Toggle />
                  {!location.pathname.includes("/search/") && (
                    <IoSearch
                      size={25}
                      className={
                        theme.theme == "dark" ? "mx-3 text-light" : "mx-3"
                      }
                      onClick={() => setSmShow(true)}
                    />
                  )}
                  <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <ModalBody>
                      <div className="input-group rounded d-flex justify-content-center">
                        <div className="" style={{ width: 200 }}>
                          <input
                            type="search"
                            className="form-control rounded"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>

                        <span
                          className="input-group-text border-0 ms-2 p-0"
                          id="search-addon"
                        >
                          <Link to={`/search/${search}`}>
                            {" "}
                            <i
                              className="fas fa-search"
                              style={{ textDecoration: "none", margin: 0 }}
                            ></i>
                          </Link>
                        </span>
                      </div>
                    </ModalBody>
                  </Modal>

                  {/* <button
          type="button"
          className="mx-3 btn btn-light"
          onClick={() => setShowLogin(true)}
        >
          Login
        </button> */}
                  {userComponent}
                  <LoginPage
                    showLogin={showLogin}
                    hideLogin={handlecloseLogin}
                  />
                </div>
              </div>
            </div>
            {/* <div>
        <FaUser />
        <li className="nav-item dropdown mx-1 ">
          <a
            className="nav-link dropdown-toggle border_bottom mx-2"
            href="#"
            onClick={() => {
              setActive("more");
            }}
          >
            USER
          </a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              Admin
            </a>
            <a className="dropdown-item" href="#">
              ABOUT US
            </a>
          </div>
        </li>
      </div> */}
          </div>
        ) : (
          <>
            <Link to="/" className="navbar-brand">
              <img
                src={logo2}
                className="img-fluid ms-4"
                alt="Responsive image"
                width="50px"
              />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse nav-list__bg-red"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link
                    to="/"
                    className={
                      active == "home"
                        ? "nav-link border_bottom nav-home_btn active-nav mx-2 "
                        : "nav-link border_bottom mx-2"
                    }
                    onClick={() => {
                      setActive("home");
                      sessionStorage.setItem("activeItem", "home");
                    }}
                  >
                    Home
                  </Link>
                </li>
                {Main_Category}
                {/* <li className="nav-item dropdown mx-1 ">
                <a
                  className={
                    active == "more"
                      ? "nav-link border_bottom dropdown-toggle active-nav "
                      : "nav-link dropdown-toggle border_bottom "
                  }
                  href="#"
                  onClick={() => {
                    setActive("more");
                  }}
                >
                  More
                </a>
                <div className="dropdown-menu">
                  <Link to ="/newsletter" className="dropdown-item" href="#">
                    NewsLetter
                  </Link>
                 
                </div>
              </li> */}
                <li className="nav-item">
                  <Link
                    to="/newsletter"
                    style={{ backgroundColor: "#0192ef", color: "white" }}
                    className={
                      active == "newsletter"
                        ? "nav-link border_bottom nav-home_btn active-nav mx-2 "
                        : "nav-link border_bottom mx-2"
                    }
                    onClick={() => {
                      setActive("newsletter");
                      sessionStorage.setItem("activeItem", "newsletter");
                    }}
                  >
                    E-magazine
                  </Link>
                </li>
              </ul>
              <div className="d-flex ms-auto align-items-center justify-content-between">
                <Toggle />
                {!location.pathname.includes("/search/") && (
                  <IoSearch
                    size={25}
                    className={
                      theme.theme == "dark" ? "mx-3 text-light" : "mx-3"
                    }
                    onClick={() => setSmShow(true)}
                  />
                )}
                <Modal
                  size="sm"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <ModalBody>
                    <div className="input-group rounded d-flex justify-content-center">
                      <div className="" style={{ width: 200 }}>
                        <input
                          type="search"
                          className="form-control rounded"
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="search-addon"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>

                      <span
                        className="input-group-text border-0 ms-2 p-0"
                        id="search-addon"
                      >
                        <Link to={`/search/${search}`}>
                          {" "}
                          <i
                            className="fas fa-search"
                            style={{ textDecoration: "none", margin: 0 }}
                          ></i>
                        </Link>
                      </span>
                    </div>
                  </ModalBody>
                </Modal>

                {userComponent}
                <LoginPage showLogin={showLogin} hideLogin={handlecloseLogin} />
              </div>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default MyNavbar;
