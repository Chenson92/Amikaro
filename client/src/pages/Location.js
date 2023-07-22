import React, { useEffect } from "react";
import EventList from "../components/EventList";
import { QUERY_EVENTS, QUERY_EVENTS_FOR_LOCATION } from "../utils/queries.js";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const Location = () => {
  let { locationId } = useParams();
  //const {loading,error,data,refetch} = useQuery(QUERY_EVENTS); // fetch to GET /graphql
  const { loading, error, data } = useQuery(QUERY_EVENTS_FOR_LOCATION, {
    variables: {
      locationId,
    },
  }); // fetch to GET /graphql

  useEffect(() => {
    console.log("*** From Location ");
    console.log(data);
  }, [loading]);

  return (
    <div className="container">
      {loading ? "Loading.. Please wait" : "Done loading"}
      {/* {loading ? "Loading.. Please wait" : <EventList events={data.events} />} */}
    </div>
  );
};

export default Location;
