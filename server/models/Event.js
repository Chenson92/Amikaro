const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const eventSchema = new Schema({
  eventText: {
    type: String,
    // required: "You need to create a event!",
    minlength: 1,
    maxlength: 3000,
    trim: true,
  },
  eventAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Event = model("Event", eventSchema);

module.exports = Event;