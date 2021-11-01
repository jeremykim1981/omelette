export function YouTubeGetID(url) {
  if (!url) return;
  let ID = '';
  url = url
    .replace(/(>|<)/gi, '')
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
}

export const getPathUrl = key => {
  return `https://dvpmgdlyf4t1g.cloudfront.net/public/${key}`;
};
