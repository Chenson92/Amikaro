import React, { useEffect } from "react";
import EventItem from "../EventItem";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "../../utils/mutations";
import AuthService from "../../utils/auth";

const EventList = (props) => {
  useEffect(() => {
    console.log("**** From EventList ****");
    console.log(props);
    console.log("login", AuthService.loggedIn());

    const dataId = AuthService.getProfile()?.data._id;
    if (dataId !== null) {
      console.log("data id: ", dataId);
    } else {
      console.log("no data id for logged out user ");
    }
  });

  const [deleteEvent, { error }] = useMutation(DELETE_EVENT);

  const handleDeleteEvent = async (eventId) => {
    try {
      console.log("EVENTTTTT", eventId);
      await deleteEvent({
        variables: { eventId },
      });
      // props.fetchEvent();
    } catch (error) {
      console.log(error);
    }
  };

  // JSX {} must return array of, string, HTML/components, or empty
  return (
    <div className="event-container">
      <h2>Our Events:</h2>
      {props.events.map((event) => {
        // console.log("event.userId");
        console.log(event);

        return (
          <div className="event-list" key={event._id}>
            <EventItem
              key={event._id}
              _id={event._id}
              image={event.image}
              title={event.title}
              eventText={event.eventText}
            />

            {AuthService.loggedIn() &&
              AuthService.getProfile().data._id === event.creator && (
                <button
                  className="btn btn-primary btn-block py-3 delete-button"
                  onClick={() => handleDeleteEvent(event._id)}>
                  Delete
                </button>
              )}
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
