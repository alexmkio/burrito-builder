const padNumber = (number: number) => {
  return number > 10 ? number.toString() : `0${number}`;
};

const returnTodaysDate = () => {
  return new Date();
};

const returnThirtyMinutesFromNow = () => {
  return new Date(
    returnTodaysDate().setTime(returnTodaysDate().getTime() + 30 * 60 * 1000)
  );
};

const returnTomorrowsDate = () => {
  return new Date(returnTodaysDate().setDate(returnTodaysDate().getDate() + 1));
};

const makeDateString = (date: Date) => {
  let year = date.getFullYear();
  let month = padNumber(date.getMonth() + 1);
  let day = padNumber(date.getDate());
  let hour = padNumber(date.getHours());
  let minute = padNumber(date.getMinutes());

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const makeMinDateTimeString = () => {
  return makeDateString(returnThirtyMinutesFromNow());
};

export const makeMaxDateTimeString = () => {
  return makeDateString(returnTomorrowsDate());
};
