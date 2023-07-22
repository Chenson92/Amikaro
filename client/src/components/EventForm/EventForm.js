import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../../utils/mutations";
import { QUERY_EVENTS, QUERY_ME } from "../../utils/queries";

import Auth from "../../utils/auth";

const EventForm = () => {
  const style = {
    height: "20em",
    width: "40em",
  };
  const [title, setEventTitle] = useState("");
  const [image, setEventImage] = useState("");
  const [eventText, setEventText] = useState("");
  //const [creator, setEventCreator] = useState("");

  const [characterCount, setCharacterCount] = useState(0);

  const [addEvent, { error }] = useMutation(ADD_EVENT, {
    update(cache, { data: { addEvent } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });

        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: [addEvent, ...events] },
        });
      } catch (e) {
        console.error(e);
      }
      console.log("***********");
      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, events: [...me.events, addEvent] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addEvent({
        variables: {
          title,
          image,
          eventText,
          // creator,
        },
      });
      setEventTitle("");
      setEventImage("");
      setEventText("");
      // setEventCreator("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "eventText" && value.length <= 500) {
      setEventText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h2>What is your event?</h2>

      {Auth.loggedIn() ? (
        <>
          <p>Character Count: {characterCount}/500</p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}>
            <div>
              <div>
                {" "}
                <label>Title</label>{" "}
              </div>
              <input
                type="text"
                name="title"
                placeholder="Create your event title"
                value={title}
                className="form-input w-100"
                onChange={(e) => {
                  setEventTitle(e.target.value);
                  console.log(e.target.value);
                }}
              />
              <br></br>
              <br></br>
              <div>
                <label>Image</label>
              </div>
              <input
                type="text"
                name="image"
                placeholder="Choose image"
                value={image}
                className="form-input"
                onChange={(e) => setEventImage(e.target.value)}
              />{" "}
              <br></br>
              <br></br>
              <div>
                {" "}
                <label>Description</label>
              </div>
              <textarea
                style={style}
                name="eventText"
                placeholder="Please describe your event here."
                value={eventText}
                className="form-input"
                onChange={handleChange}></textarea>
            </div>
            <div></div>
            <br></br>
            <div>
              <button className="btn btn-primary btn-block py-3" type="submit">
                Create Event
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add your events. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EventForm;
