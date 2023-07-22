import React from "react";
import { Link } from "react-router-dom";
const EventItem = (props) => (
  <div className="card px-1 py-1">
    <Link to={`/locations/${props._id}`}>
      <img alt={props.title} src={`/images/${props.image}`} />
      <p>{props.title}</p>
      <p>{props.eventText}</p>
    </Link>
    <div></div>
  </div>
);

export default EventItem;
