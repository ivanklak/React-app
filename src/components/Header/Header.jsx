import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";

const Header = ({ isAuth, login, logout }) => {
  return (
    <header className={s.header}>
      <NavLink to={"/profile"}>
        <img src="https://cdn.auth0.com/blog/react-js/react.png"></img>
      </NavLink>
      <div className={s.loginBlock}>
        {isAuth ? (
          <div>
            {login} - <button onClick={logout}>Log out</button>{" "}
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;
