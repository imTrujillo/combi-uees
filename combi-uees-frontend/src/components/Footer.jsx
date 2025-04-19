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
    <footer className="footer text-white p-4 d-flex flex-column flex-lg-row w-full gap-4">
      <div className="col text-start">
        <h2 className="logo-text">COMBI-UEES</h2>
        <form action="" className="px-2" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="" className="ms-2">
            Buzón de sugerencias
          </label>
          <div className="d-flex flex-row mt-2">
            <input
              type="text"
              placeholder="Feedback..."
              className="py-1 px-2 rounded-4 feedback w-75 h-auto"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick="submit"
              className="footer-btn fs-4 px-2 py-0 rounded-4 border-0 mx-2"
            >
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
      <div className="col text-start ps-4">
        <h2>Contacto</h2>
        <ul className="text-start">
          <li>Dirección</li>
          <li>Email</li>
          <li>Teléfono</li>
        </ul>
      </div>
      <div className="col">
        <h2>Redes sociales</h2>
        <ul className=" list-unstyled d-flex flex-row justify-content-center gap-5">
          <li className="fs-1">
            <IoLogoWhatsapp className="icono-socialmedia" />
          </li>
          <li className="fs-1">
            <RiInstagramFill className="icono-socialmedia" />
          </li>
          <li className="fs-1">
            <FaFacebook className="icono-socialmedia" />
          </li>
        </ul>
      </div>
    </footer>
  );
}
