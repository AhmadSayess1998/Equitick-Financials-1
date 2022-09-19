import React, { useEffect } from "react";
import PostAddIcon from "@mui/icons-material/PostAdd";
import InputIcon from "@mui/icons-material/Input";
import { NavLink } from "react-router-dom";
import "./nav.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

function Nav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <div className="nav">
      <div data-aos-duration="1500" data-aos="fade-down">
        <h3 id="h3">Equitick Financials</h3>
        <h6>{user && user.email} </h6>
      </div>
      <ul>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "var(--buttonhover1)",
                  color: "var(--textcolor1)",
                }
              : { backgroundColor: "transparent" }
          }
          to="/dashboard/posts"
        >
          <li
            data-aos-duration="1500"
            data-aos="fade-right"
            style={{ backgroundColor: "inherit" }}
          >
            <PostAddIcon className="icon" />
            <span className="ms-3">Posts</span>
          </li>
        </NavLink>
        <NavLink
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "var(--buttonhover1)",
                  color: "var(--textcolor1)",
                }
              : { backgroundColor: "transparent" }
          }
          to="/dashboard/postsone"

        >
          <li
            data-aos-duration="1500"
            data-aos="fade-right"
            style={{ backgroundColor: "inherit" }}
          >
            <PostAddIcon className="icon" />
            <span className="ms-3">Posts 1</span>
          </li>
        </NavLink>
      
        <NavLink
          onClick={handleClick}
          to="/"
          style={({ isActive }) =>
            isActive
              ? {
                  backgroundColor: "var(--buttonhover1)",
                  color: "var(--textcolor1)",
                }
              : { backgroundColor: "transparent" }
          }
        >
          <li
            style={{ backgroundColor: "inherit"  }}
            className="logout"
            data-aos-duration="1500"
            data-aos="fade-right"
          >
            <InputIcon className="icon" />
            <span className="ms-3">logout</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}

export default Nav;
