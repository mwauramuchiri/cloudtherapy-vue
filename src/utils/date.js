const getTime = (secondsInput) => {
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

//* EXPORTS
export default {
    getTime
};