import axios from "axios";
import Resizer from "react-image-file-resizer";

export const checkParthName = (name) => {
  if (name === "BEAUTY") return "/blogs/beauty";
  // if (name === "CAFE & TRAVEL") return "/blogs/cafe_travel";
  // if (name === "CAFE") return "/blogs/cafe_travel";
  // if (name === "TRAVEL") return "/blogs/cafe_travel";
  if (name === "CAFE") return "/blogs/cafe";
  if (name === "TRAVEL") return "/blogs/travel";
  if (name === "FASHION") return "/blogs/fashion";
  if (name === "WITCHCRAFT") return "/blogs/witchcraft";
  if (name === "CHANNEL") return "/channel";
  if (name === "OTHER") return "/blogs/other";
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
// export const ThaiDate = (date) => {
//   const d = new Date(date);

//   const month = new Array();
//   month[0] = "มกราคม";
//   month[1] = "กุมภาพันธ์";
//   month[2] = "มีนาคม";
//   month[3] = "เมษายน";
//   month[4] = "พฤษภาคม";
//   month[5] = "มิถุนายน";
//   month[6] = "กรกฎาคม";
//   month[7] = "สิงหาคม";
//   month[8] = "กันยายน";
//   month[9] = "ตุลาคม";
//   month[10] = "พฤศจิกายน";
//   month[11] = "ธันวาคม";

//   const dd = d.getDate();
//   const mm = month[d.getMonth()];
//   const yyyy = d.getFullYear() + 543;

//   return `${dd} ${mm} ${yyyy}`;
// };

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
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
// Encode Youtube
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
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//Check Https
export const Check_Https = (link) => {
  const https = "https://";
  const have_https = link.startsWith("https://");
  if (have_https) {
    return link;
  } else {
    return `${https + link}`;
  }
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//SumOfArray
export const SumOfArray = (input) => {
  if (toString.call(input) !== "[object Array]") return false;

  var total = 0;
  for (var i = 0; i < input.length; i++) {
    if (isNaN(input[i])) {
      continue;
    }
    total += Number(input[i]);
  }
  return total;
};
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
export const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

// export const blobToFile = (theBlob, fileName) => {
//   theBlob.lastModifiedDate = new Date();
//   theBlob.name = fileName;
//   return theBlob;
// };

// export const blob2file = (blobData) => {
//   const fd = new FormData();
//   fd.set("a", blobData);
//   return fd.get("a");
// };

// export const blobToFile = (theBlob, fileName) => {
//   if (!theBlob) return null;
//   return new File([theBlob], fileName, {
//     lastModified: new Date().getTime(),
//     type: "image/png",
//   });
// };

export const getFetchBlob = async (data) => {
  if (!data) return null;
  return await fetch(data).then((res) => res.blob());
};

// export const blob_to_file = (blob) => {
//   if (!blob) return null;
//   const myFile = new File([blob], "image.jpeg", {
//     type: blob.type,
//   });
//   return myFile;
// };

// export function blobToFile(blob) {
//   if (!blob) return null;
//   const reader = new FileReader();
//   reader.readAsDataURL(blob);
//   const sixty_four = (reader.onloadend = function () {
//     const base64data = reader.result;
//     return base64data;
//   });
//   contentType = contentType || "";
//   const sliceSize = 1024;
//   const byteCharacters = atob(sixty_four);
//   const bytesLength = byteCharacters.length;
//   const slicesCount = Math.ceil(bytesLength / sliceSize);
//   const byteArrays = new Array(slicesCount);

//   for (const sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
//     const begin = sliceIndex * sliceSize;
//     const end = Math.min(begin + sliceSize, bytesLength);

//     const bytes = new Array(end - begin);
//     for (const offset = begin, i = 0; offset < end; ++i, ++offset) {
//       bytes[i] = byteCharacters[offset].charCodeAt(0);
//     }
//     byteArrays[sliceIndex] = new Uint8Array(bytes);
//   }
//   const file = new File(byteArrays, "image", { type: "image/png" });
//   return file;
// }

export const blobToFile = (blob, file) => {
  if (!blob) return null;
  const name = file[0]?.file?.name;
  const type = file[0]?.file?.type;
  const size = 334208;
  const x = new File([blob], name, { type: type });
  return x;
};

export const uploadFile = async (formData) => {
  return await axios({
    method: "POST",
    url: "https://admin.jajoin.co/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const Check_Link = (link) => {
  if (null) return flase;
  const have_https = link?.startsWith("https://");
  if (have_https) {
    return true;
  } else {
    return false;
  }
};

export const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1620,
      2880,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
export const resizeFileContent = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1080,
      1920,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
export const resizeFileToBlob = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      520,
      960,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "Blob"
    );
  });

export const openInNewTab = (url) => {
  window?.open(url, "_blank");
};
