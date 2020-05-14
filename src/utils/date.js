import moment from "moment";

/** Get the time from number of seconds since Epoch
 * @param {Number} secondsInput The number of seconds since Epoch
 */
const getTime = secondsInput => {
  let dateObj = new Date(secondsInput * 1000);

  const offsetTotalMin = dateObj.getTimezoneOffset();
  const offsetHours = Math.floor(offsetTotalMin / 60);
  const offsetMin = offsetTotalMin % 60;

  let hours = dateObj.getUTCHours() - offsetHours;
  let minutes = dateObj.getUTCMinutes() - offsetMin;

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
const formatDate = (date, format = "DD MMMM YYYY") => {
  const friendlyLocalDate = moment(date, "YYYY-MM-DD HH:mm:ss Z")
    .local()
    .format(format);
  return friendlyLocalDate;
};

/** Get the date `yearsRequired` ago.
 * @example Used to find the latest date of birth a user may need to be to use the site
 * @param {Number} yearsRequired Years required to use the site
 */
const getDateYearsAgo = (yearsRequired = 18) => {
  return moment()
    .subtract(yearsRequired, "years")
    .format("YYYY-mm-DD");
};

//* EXPORTS
export { formatDate, getTime, getDateYearsAgo };
