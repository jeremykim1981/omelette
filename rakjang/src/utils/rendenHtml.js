import parse from "html-react-parser";
import { renderToStaticMarkup } from "react-dom/server";
import _ from "lodash";

const options = {
  replace: ({ attribs, name }) => {
    if (attribs && name === "img") {
      attribs.style = "width:100%;";
    }
  },
};

export const renderHtml = (content) => {
  return renderToStaticMarkup(parse(content || "Hello World"));
};
