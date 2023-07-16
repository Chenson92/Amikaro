const db = require("../config/connection");
const { User, Event, Booking } = require("../models");
//const userSeeds = require("./userSeeds.json");
//const eventSeeds = require("./eventSeeds.json");
const bookingSeeds = require("./bookingSeeds.json");

db.once("open", async () => {
  await Booking.deleteMany({});

  await Event.deleteMany({});

  const events = await Event.insertMany([
    {
      title: "Pizza Night ",
      image: "pizzanight.jpg",
      eventText:
        "We will host our first Pizza night this Saturday! Everyone is welcomed. We will introduce Esperanto while enjoying pizza and drinks!",
    },
    {
      title: "Esperanto Camping",
      image: "camp.jpg",
      eventText:
        "Meet up other esperanto speakers & Join us for this camping event in Woy Woy on 8th August!",
    },
    {
      title: "Esperanto Book-club",
      image: "read.jpg",
      eventText:
        "Learn and improve your language skill, by reading and discussing books in Esperanto.★ Lernu kaj plibonigu vian lingvo-lertecon per legado kaj diskutado de Esperanto-libroj.",
    },
    {
      title: "Esperanto Course",
      image: "esperanto.jpg",
      eventText:
        "This course is for beginners and all level! If you are interested in Esperanto, come and join our class!",
    },
  ]);

  console.log("events seeded");

  await User.deleteMany({});

  await User.create({
    username: "Brian",
    email: "brian@gmail.com",
    password: "password01",
  });

  //   for (let i = 0; i < eventSeeds.length; i++) {
  //     const { _id, creator } = await Event.create(eventSeeds[i]);
  //     const user = await User.findOneAndUpdate(
  //       { username: creator },
  //       {
  //         $addToSet: {
  //           events: _id,
  //         },
  //       }
  //     );
  //   }
  // } catch (err) {
  //   console.error(err);
  //   process.exit(1);
  // }

  console.log("users seeded");
  process.exit();
});
