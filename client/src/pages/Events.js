import React from "react";
import { useQuery } from "@apollo/client";

import EventList from "../components/EventList";
//import EventForm from "../components/EventForm";

import { QUERY_EVENTS } from "../utils/queries";

const Events = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  return (
    <main>
      <div className="container">
        <div className="cp_main_parent">
          <div className="cp_subparent">
            <div className="cp_textdiv">
              <p className="cp_header1">Esperanto Events!</p>
              <p className="cp_header2">Here are some events you can join!</p>
            </div>
          </div>

          <div className="cp_cardsdiv">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <EventList events={events} title="event ideas..." />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Events;
