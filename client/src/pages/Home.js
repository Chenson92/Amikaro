import React, { useEffect } from "react";
import EventList from "../components/EventList";
import { QUERY_EVENTS } from "../utils/queries.js";
import { useQuery } from "@apollo/client";

const Home = () => {
  //const {loading,error,data,refetch} = useQuery(QUERY_EVENTS); // fetch to GET /graphql
  const { loading, error, data } = useQuery(QUERY_EVENTS); // fetch to GET /graphql

  useEffect(() => {
    console.log(data);
  }, [loading]);

  return (
    <div className="container">
      {/* {loading ? "Loading.. Please wait" : "Done loading"} */}
      {loading ? "Loading.. Please wait" : <EventList events={data.events} />}
    </div>
  );
};

export default Home;
