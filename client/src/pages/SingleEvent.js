import * as React from "react";
//import Image from "../assets/";
import { useNavigate } from "react-router-dom";
//import Button from "./Button";

export default function SingleEvent({ club, type, event }) {
  const nav = useNavigate();

  const cardButtonHandler = () => {
    nav(`/events/${event._id}`);
  };

  return (
    <>
      <div onClick={cardButtonHandler}>
        <div>
          <img />
        </div>
        <div>
          <p>{type === "events" ? event.Eventname : club.name}</p>
          <p>{type === "events" ? event.Eventdate : club.tagLine}</p>
          <p>{type === "events" ? event.Eventlocation : null}</p>
        </div>
      </div>
    </>
  );
}
