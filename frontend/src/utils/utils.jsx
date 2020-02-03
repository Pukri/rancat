/* eslint-disable import/prefer-default-export */

export const timestampToJson = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const datevalues = {
     year: date.getFullYear(),
     month: date.getMonth()+1,
     date: date.getDate(),
     hours: date.getHours(),
     minutes: date.getMinutes(),
     seconds: date.getSeconds(),
  };
  return datevalues;
};
