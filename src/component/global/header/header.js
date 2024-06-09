import { ImCart } from "react-icons/im";
import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.css";
import logoB from "../../../assets/images/logo/b.png";
import logoA from "../../../assets/images/logo/a.png";
import logoL from "../../../assets/images/logo/l.png";
import logoQ from "../../../assets/images/logo/q.png";
import logoN from "../../../assets/images/logo/n.png";

const Header = () => {
  return (
    <header className={style.mainHeader}>
      <div className={`container ${style.container}`}>
        <Link to="/" className={style.logo}>
          <img
            src={logoB}
            alt="Logo B"
            className={`${style.letter} ${style.b}`}
          />
          <img
            src={logoA}
            alt="Logo A"
            className={`${style.letter} ${style.firstA}`}
          />
          <img
            src={logoL}
            alt="Logo L"
            className={`${style.letter} ${style.l}`}
          />
          <span className={`${style.dot} ${style.left}`}></span>
          <div className={`${style.letter} ${style.letterDiv}`}>
            <div className={style.letterQDiv}>
              <img src={logoQ} alt="Logo Q" />
            </div>
          </div>
          <span className={`${style.right} ${style.dot}`}></span>
          <img
            src={logoA}
            alt="Logo A"
            className={`${style.letter} ${style.secondA}`}
          />
          <img
            src={logoN}
            alt="Logo N"
            className={`${style.letter} ${style.n}`}
          />
        </Link>
        <ul className={style.tileWords}>
          <li>
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <div className={style.icons}>
          <Link to="/cart">
            <ImCart
              className={style.shoppingCartIcon}
              aria-label="Shopping Cart"
            />
          </Link>
          <span>KM 0.00</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
