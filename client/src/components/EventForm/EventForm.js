import React, { useState } from "react";
//import {Redirect} from "react-router-dom";
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
          image: window.filePath,
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
    window.location.href = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "eventText" && value.length <= 500) {
      setEventText(value);
      setCharacterCount(value.length);
    }
  };

  const handleFileUpload = async (event) => {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    //setEventImage("images/" + event.target.files[0].name);
    window.filePath = event.target.files[0].name;

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Success");
        // console.log("Upload successful");
        // var result = await response.json();
        // console.log("Server response: ", result); // Log the entire result object
        // let fileUrl = "http://localhost:3001" + result.filePath;
        // console.log("File URL: ", fileUrl);
      } else {
        console.error("Upload unsuccessful");
      }
    } catch (error) {
      console.error(error);
    }
    // now state image is pointing to user's file
  };

  return (
    <div className="event-form-container">
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
                type="file"
                name="image"
                placeholder="Image url"
                value={image}
                className="form-input"
                onChange={(e) => {
                  handleFileUpload(e);
                }}
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
              <div>
                <button
                  className="btn btn-primary btn-block py-3"
                  type="submit">
                  Create Event
                </button>
              </div>
            </div>

            {/* <br></br> */}

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
