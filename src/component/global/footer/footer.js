import { CgInstagram } from "react-icons/cg";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { BsSnapchat } from "react-icons/bs";
import React from "react";
import logo from "../../../assets/images/logo/logo.png";
import style from "./footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className={[style.container, style.simpleCenter].join(" ")}>
        <div className={style.row}>
          <div className={style.image}>
            <a href="/" title="home">
              <img src={logo} alt="Logo Image" />
            </a>
          </div>
          <div className={style.icons}>
            <a
              href="https://www.instagram.com/balqan01?igsh=YTQwZjQ0NmI0OA%3D%3D&utm_source=qr"
              className="instagram"
              target="_blank"
            >
              <CgInstagram />
            </a>
            <a
              href="https://wa.me/message/XX3SX2GZKPV2K1?src=qr"
              className="whatsapp"
              target="_blank"
            >
              <AiOutlineWhatsApp />
            </a>
            <a
              href="https://t.snapchat.com/CcJTjXmZ"
              className="snapchat"
              target="_blank"
            >
              <BsSnapchat />
            </a>
          </div>
        </div>
        <div className={[style.row, style.simpleCenter].join(" ")}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a to="">About</a>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <p>Copyright &#169; 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
