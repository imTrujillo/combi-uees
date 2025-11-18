import React, { useState } from "react";

import "../../css/footer.css";
import { IoIosSend } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    let numero = "50373646423";

    let url = `https://wa.me/${numero}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };
  return (
    <footer className="footer text-white p-4 d-flex flex-column flex-lg-row w-full gap-5">
      <div className="text-center text-lg-start">
        <h2 className="logo-text">LA COMBI</h2>
        <form action="" className="px-2" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="" className="ms-2">
            Buzón de sugerencias
          </label>
          <div className="d-flex flex-row mt-2 justify-content-center justify-content-lg-start">
            <input
              type="text"
              placeholder="Feedback..."
              className="py-1 px-2 rounded-4 feedback w-75 h-auto border-0 btn-light-shadow"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick="submit"
              className="footer-btn btn-light-shadow fs-4 px-2 py-0 rounded-4 border-0 mx-2"
            >
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
      <div className="text-center text-lg-start">
        <h2>Contacto</h2>
        <ul className="text-start list-unstyled d-flex flex-column align-items-center d-lg-block">
          <li>Dirección</li>
          <li>Email</li>
          <li>Teléfono</li>
        </ul>
      </div>
      <div>
        <h2>Redes sociales</h2>
        <ul className=" list-unstyled d-flex flex-row justify-content-center gap-5">
          <li className="fs-1">
            <IoLogoWhatsapp className="icono-socialmedia " />
          </li>
          <li className="fs-1">
            <RiInstagramFill className="icono-socialmedia " />
          </li>
          <li className="fs-1">
            <FaFacebook className="icono-socialmedia " />
          </li>
        </ul>
      </div>
    </footer>
  );
}
