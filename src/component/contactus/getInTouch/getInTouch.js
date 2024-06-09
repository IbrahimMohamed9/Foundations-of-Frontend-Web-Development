import { BiMapAlt } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import React from "react";
import styles from "./getInTouch.module.css";
import MainTitle from "../../global/mainTitle/mainTitle";
import GetInTouchColumn from "./getInTouchColumn";

const GetInTouch = () => {
  return (
    <div className={`newSection ${styles.touch}`}>
      <MainTitle title="Get In Touch" />
      <div className={`container ${styles.container}`}>
        <GetInTouchColumn
          title="Phone"
          content="+38733922790"
          icon={<BsFillTelephoneFill />}
        />
        <GetInTouchColumn
          title="Address"
          content={`5, Isevića sokak,${(<br />)}
          MZ "Bistrik", City of Sarajevo,${(<br />)}
          Federation of Bosnia and Herzegovina,${(<br />)}
          71200, Bosnia and Herzegovina${(<br />)}`}
          icon={<BiMapAlt />}
        />
        <GetInTouchColumn
          title="Email"
          content="info@balqan.net"
          icon={<AiOutlineMail />}
        />
      </div>
    </div>
  );
};

export default GetInTouch;
