import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer>
      <div>
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <p>
          Made with{" "}
          <span
            className="emoji"
            role="img"
            aria-label="heart"
            aria-hidden="false">
            ❤️
          </span>{" "}
          by Esperantisto Doriso-Dola.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
