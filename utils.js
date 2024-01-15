export function formatDateStatus(timestampObject) {
  // Convert the timestamp to milliseconds
  const milliseconds =
    timestampObject?.seconds * 1000 +
    Math.floor(timestampObject?.nanoseconds / 1e6);

  // Create a new Date object based on the timestamp
  const inputDate = new Date(milliseconds);

  // Create a new Date object for the current date
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - inputDate;

  // Calculate the number of days
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  // Function to get the ordinal suffix for a number (e.g., 1st, 2nd, 3rd)
  function getOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    }
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  // Check the conditions and return the appropriate string
  if (daysDifference === 0) {
    return "today";
  } else if (daysDifference === 1) {
    return "yesterday";
  } else if (daysDifference >= 2 && daysDifference <= 6) {
    return inputDate.toLocaleDateString("en-US", { weekday: "long" });
  } else if (daysDifference >= 7) {
    const day = getOrdinalSuffix(inputDate.getDate());
    const month = inputDate.toLocaleDateString("en-US", { month: "short" });
    const year = inputDate.getFullYear();
    return `${day} ${month} ${year}`;
  }
}

// Example usage:
const timestampObject = {
  seconds: 1705173451,
  nanoseconds: 16000000,
};

const result = formatDateStatus(timestampObject);
// console.log(result);

export const validateMessage = (msg) => {
  // Regex for email, bank account and phone number
  const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneNoPattern = /\b\d{11,}\b/;
  const bankAccountPattern = /\b\d{10,}\b/;

  // check if the message contains sensitive info
  if (
    emailPattern.test(msg) ||
    phoneNoPattern.test(msg) ||
    bankAccountPattern.test(msg)
  ) {
    console.log("Message contains sensitive information");
    return false; //Prevent sending
  }
  return true;
};

export const formatDate = (dateInMs) => {
  let dt = typeof dateInMs === "string" ? Number(dateInMs) : dateInMs;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currDate = new Date();
  const inputDate = new Date(dt);

  if (
    inputDate.getDate() === currDate.getDate() &&
    inputDate.getMonth() === currDate.getMonth() &&
    inputDate.getYear() === currDate.getYear()
  ) {
    return "Today";
  }

  // Check if the date is yesterday
  const yesterday = new Date(currDate);
  yesterday.setDate(currDate.getDate() - 1);

  if (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getYear() === yesterday.getYear()
  ) {
    return "Yesterday";
  }

  // check if the date is within the last week
  const daysDiff = Math.floor((currDate - inputDate) / (1000 * 60 * 60 * 24));

  if (daysDiff <= 7) {
    const day = currDate.getDay() - daysDiff;
    if (daysDiff === 7) {
      return daysOfWeek[currDate.getDay()];
    }
    return daysOfWeek[day];
  } else {
    if (daysDiff >= 30) {
      const date = new Date(Date.now() - daysDiff * 24 * 60 * 60 * 1000);
      const options = { month: "long", day: "numeric", year: "numeric" };
      return inputDate.toLocaleDateString("en-US", options);
    }
    if (daysDiff > 7) {
      const weeks = Math.floor(daysDiff / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    }
    // return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
    return "WTF!!!";
  }
};
const currDate = new Date();
currDate.setHours(0, 0, 0, 0);
const yesterday = currDate.getTime() - 1 * 24 * 60 * 60 * 1000;

const testDt = new Date(1702931243354).getTime();

export const convertToTime = (seconds, nanoseconds) => {
  const timestamp = seconds * 1000 + Math.round(nanoseconds / 1e6);
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const test = formatDate(timestamp);
  // console.log(test);

  return { time: formattedTime, date: formattedDate, timestamp };
};

// framer-motion variants

export const container = {
  hidden: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.6,
      when: "beforeChildren",
    },
  },
};

export const paneAnimate = {
  hidden: { opacity: 0, x: window.innerWidth },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeIn",
      staggerChildren: 0.6,
    },
  },
};

export const innerAnimate = {
  hidden: { opacity: 0, y: 100 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.8,
    },
  },
};

export const listAnimate = {
  hidden: { opacity: 0, y: 100 },
  animate: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.08,
      duration: 0.8,
      type: "spring",
    },
  }),
};

export const menuVariant = {
  hidden: { y: -window.innerHeight },
  animate: { y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 30, transition: { duration: 10 } },
};

export const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 2 } },
  exit: { opacity: 0, y: 30, transition: { duration: 10 } },
};
