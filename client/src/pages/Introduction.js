import React from "react";
import logo from "../assest/esperanto-flag.jpg";
import homo from "../assest/Zamenhof.jpg";
const Introduction = () => {
  return (
    <div className="container">
      <br></br>
      <h1>What is Esperanto?</h1>
      <div className="intro-container">
        <img className="homo" src={homo} alt="homo" />
        <h4>
          It is a language designed to enable easy communication between people
          of different countries and cultures. It was launched in 1887 by Dr
          Ludvik Zamenhof under the pseudonym “Doktoro Esperanto” (which
          literally means ”Doctor Hoper”)
        </h4>
      </div>
      <br></br>
      <h1>About Us</h1>
      <h4>
        Amikaro means " a group of friends" in Esperanto. The mission of Amikaro
        is to create and maintain a social network that provides a platform for
        users of all languages worldwide to meet, learn, and practice Esperanto.
      </h4>
      <br></br>

      <img className="flag" src={logo} alt="Logo" />
      <p>Esperanto Flag (Esperanto-flago)</p>
    </div>
  );
};

export default Introduction;
