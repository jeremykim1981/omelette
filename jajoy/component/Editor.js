import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import React, { Component } from "react";

const Editor = ({ setContent }) => {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={(event, editor) => {
        const data = editor?.getData();
        setContent(data);
      }}
    />
  );
};

export default Editor;
