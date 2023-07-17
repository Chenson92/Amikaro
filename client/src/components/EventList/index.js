import React, { useEffect } from "react";
import EventItem from "../EventItem";

const EventList = (props) => {
  useEffect(() => {
    console.log("**** From EventList ****");
    console.log(props);
  }, []);

  // JSX {} must return array of, string, HTML/components, or empty
  return (
    <div className="event-container">
      <h2>Our Events:</h2>
      {props.events.map((event) => {
        return (
          <div className="my-2">
            <EventItem
              key={event._id}
              _id={event._id}
              image={event.image}
              title={event.title}
              eventText={event.eventText}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
