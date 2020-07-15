import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = props => {
  return (
    <header className={s.header}>
      {/* <a>KLAKOTCKII</a> */}
      <NavLink to={"/profile"}>
      <img src="https://cdn.auth0.com/blog/react-js/react.png"></img>
      </NavLink>
      <div className={s.loginBlock}>
        {props.isAuth ? props.login : <NavLink to={"/login"}>Login</NavLink>}
      </div>
    </header>
  );
};
export default Header;
