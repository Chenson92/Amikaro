import React from "react";
import { Link } from "react-router-dom";
const EventItem = (props) => (
  <div className="card px-1 py-1">
    <Link to={`/locations/${props._id}`}>
      <div className="event-container">
        <div className="image-container">
          <img alt={props.title} src={`/images/${props.image}`} />
        </div>
        <div className="text-container">
          <p>{props.title}</p>
          <p>{props.eventText}</p>
        </div>
      </div>
    </Link>
    <div></div>
  </div>
);

export default EventItem;
