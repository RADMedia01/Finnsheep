import mongoose from "mongoose";

export const connectToDB = async () => {
    const connection = {};
  try {
    if (connection.isConnected) return;
    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error(error);
  }
};


export const getCurrentTime = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const currentDate = new Date();
  const dayOfWeek = days[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12; // Convert hour to 12-hour format
  const formattedTime = `${dayOfWeek}, ${month} ${day}, ${year} at ${hour}:${minute < 10 ? '0' : ''}${minute} ${period}`;

  return formattedTime;
};


