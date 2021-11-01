import parse from "html-react-parser";
import { renderToStaticMarkup } from "react-dom/server";
import _ from "lodash";
import { getPathUrl, getPathUrlContent } from "../utils/getPathUrl";

const options = {
  replace: ({ attribs, name }) => {
    if (attribs && name === "img") {
      attribs.style = "width:100%;";
    }
  },
};

export const renderHtml = (description) => {
  return renderToStaticMarkup(parse(description || "Hello World", options));
};
