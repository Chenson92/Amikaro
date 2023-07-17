import React from "react";
import logo from "../assest/esperanto-flag.jpg";
const Introduction = () => {
  return (
    <div className="container">
      <h1>What is Esperanto?</h1>
      <h4>
        It is a language designed to enable easy communication between people of
        different countries and cultures. It was launched in 1887 by Dr Ludvik
        Zamenhof under the pseudonym “Doktoro Esperanto” (which literally means
        ”Doctor Hoper”)
      </h4>
      <br></br>
      <h1>About Us</h1>
      <h4>
        Amikaro means " a group of friends" in Esperanto. The mission of Amikaro
        is to create and maintain a social network that provides a platform for
        users of all languages worldwide to meet, learn, and practice Esperanto.
      </h4>
      <br></br>

      <img src={logo} alt="Logo" />
      <p>Esperanto Flag</p>
    </div>
  );
};

export default Introduction;
