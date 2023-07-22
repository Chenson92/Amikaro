import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import EventForm from "../components/EventForm/EventForm";

import { QUERY_EVENTS } from "../utils/queries";
import { ADD_EVENT } from "../utils/mutations";

const AddEvent = () => {
  const { loading, data, refetch } = useQuery(QUERY_EVENTS);
  //const events = data?.events || [];
  const [createEvent] = useMutation(ADD_EVENT);

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent({
        variables: eventData,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <div style={{ border: "1px dotted #1a1a1a" }}>
          <EventForm onSubmit={handleCreateEvent} />
        </div>
      </div>
    </div>
  );
};
export default AddEvent;
