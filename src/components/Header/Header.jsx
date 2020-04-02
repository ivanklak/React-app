import React from "react";
import s from "./Header.module.css";

const Header = () => {
  return (
    <header className={s.header}>
      {/* <a>KLAKOTCKII</a> */}
      <img src="https://cdn.auth0.com/blog/react-js/react.png"></img>
    </header>
  );
};
export default Header;
