// returns current date
const today  = () => {
    return new Date().toLocaleDateString();
};

// would typically use moment.js instead of writing my own date formatter -
// this is unnecessary with moment.js
// function to format datetime
const formatDateTime = dateStr => {

  const calcHour = hour => {

    if (hour === 0) return { hour: 12, amPm: "am" };
    else if (hour > 12) return { hour: (hour - 12), amPm: "pm" };
    else return { hour: hour, amPm: "am" };
  };

  const fillMinutes = min => {
    return (min < 10) ? ("0" + min) : ("" + min);
  };

  const date = new Date(dateStr);
  const hourAmPm = calcHour(date.getHours());

  let formattedDate = (date.getMonth() + 1) + "/";
  formattedDate += date.getDate() + "/";
  formattedDate += date.getFullYear() + " ";
  formattedDate += hourAmPm.hour + ":";
  formattedDate += fillMinutes(date.getMinutes()) + " ";
  formattedDate += hourAmPm.amPm;

  return formattedDate;
};

module.exports = {
  today: today,
  formatDateTime: formatDateTime
};
