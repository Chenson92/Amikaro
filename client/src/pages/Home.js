import React from "react";

const Home = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <p>
        Welcome to the homepage of Amikaro, a hub for Esperanto speakers to
        meetup and practise the language."
      </p>
    </div>
  );
};

export default Home;
