import moment from "moment";

const getTime = secondsInput => {
  let dateObj = new Date(secondsInput * 1000);
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();

  hours = isNaN(hours) ? "--" : hours;
  minutes = isNaN(minutes) ? "--" : minutes;

  let timeString = `${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} `;

  return timeString;
};

/** Get a friendly date from an `Date()` format date.
 * @param {String} responseDate A response date in the format of "YYYY-MM-DD HH:mm:ss Z"
 */
const formatDate = (date, format = "Do MMMM YYYY") => {
  const friendlyLocalDate = moment(date, "YYYY-MM-DD HH:mm:ss Z")
    .local()
    .format(format);
  return friendlyLocalDate;
};

//* EXPORTS
export { formatDate, getTime };
