export const timeDifference = (current, previous) => {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current + 2000 - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
};
export const AddUrlToFile = (file) => {
  if (!file) return;
  if (file) {
    const src = URL.createObjectURL(file);
    return src;
  }
};

export const getPathUrl = (key) => {
  return `https://do7t3y0lncfch.cloudfront.net/public/${key}`;
};

export const EngDate = (date) => {
  const d = new Date(date);

  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const dd = d.getDate();
  const mm = month[d.getMonth()];
  const yyyy = d.getFullYear();

  return `${mm} ${dd} , ${yyyy}`;
};

export const openInNewTab = (url) => {
  if (!url) return;
  window.open(url, "_blank");
};

export const ZeroPad = (num, numZeros) => {
  var n = Math.abs(num);
  var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
  var zeroString = Math.pow(10, zeros).toString().substr(1);
  if (num < 0) {
    zeroString = "-" + zeroString;
  }

  return zeroString + n;
};

export const ThaiDate = (date) => {
  const d = new Date(date);

  const month = new Array();
  month[0] = "มกราคม";
  month[1] = "กุมภาพันธ์";
  month[2] = "มีนาคม";
  month[3] = "เมษายน";
  month[4] = "พฤษภาคม";
  month[5] = "มิถุนายน";
  month[6] = "กรกฎาคม";
  month[7] = "สิงหาคม";
  month[8] = "กันยายน";
  month[9] = "ตุลาคม";
  month[10] = "พฤศจิกายน";
  month[11] = "ธันวาคม";

  const dd = d.getDate();
  const mm = month[d.getMonth()];
  const yyyy = d.getFullYear() + 543;

  return `${dd} ${mm} ${yyyy}`;
};

export const TransferDateTime = () => {
  const today = new Date();

  const transfer_date = `${today.getFullYear()}-${ZeroPad(
    today.getMonth() + 1,
    2
  )}-${ZeroPad(today.getDate(), 2)}`;

  const transfer_time = `${
    ZeroPad(today.getHours(), 2) + ":" + ZeroPad(today.getMinutes(), 2)
  }`;
  return { transfer_date, transfer_time };
};

export function YouTubeGetID(url) {
  if (!url) return;
  let ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}
