import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { resizeFile, uploadFile } from "../../function/functions";

const Wrapper = styled.div`
  .ck-editor__main {
    min-height: 200px;
    > div {
      min-height: 200px;
    }
  }
`;

const imageConfig = {
  styles: ["alignLeft", "alignCenter", "alignRight"],
  resizeOptions: [
    {
      name: "imageResize:original",
      label: "Original",
      value: null,
    },
    {
      name: "imageResize:25",
      label: "25%",
      value: "25",
    },
    {
      name: "imageResize:50",
      label: "50%",
      value: "50",
    },
    {
      name: "imageResize:75",
      label: "75%",
      value: "75",
    },
    {
      name: "imageResize:100",
      label: "100%",
      value: "100",
    },
  ],
  toolbar: [
    "imageStyle:alignLeft",
    "imageStyle:alignCenter",
    "imageStyle:alignRight",
    "|",
    "imageResize",
    "|",
    "imageTextAlternative",
  ],
};

const configuration = {
  image: imageConfig,
  toolbar: [
    "heading",
    "|",
    "fontsize",
    "fontfamily",
    "fontcolor",
    "highlight",
    "|",
    "bold",
    "italic",
    "underline",
    "|",
    "alignment",
    "outdent",
    "indent",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "link",
    "blockQuote",
    // "insertTable",
    // "uploadImage",
    "undo",
    "redo",
  ],
};
const EditorTwo = ({ onChange, content, setContent }) => {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
      ClassicEditor: require("./ckeditor"),
    };
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    if (!editorLoaded) return;
    var node = document?.querySelector(".ck-toolbar__items");
    var btnNode = document?.createElement("button");
    btnNode.className = "ck ck-button ck-off";
    btnNode.innerHTML = `<label for="wusiwyg-file"><svg  id="image"  class="ck ck-icon ck-button__icon" fill="none"  stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" > <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"  ></path> </svg></label>`;
    node.appendChild(btnNode);
  }, [editorLoaded]);

  useEffect(() => {
    document
      ?.getElementById("image")
      ?.addEventListener("touchstart", handleUploadChange);

    return () => {
      document
        ?.getElementById("image")
        ?.removeEventListener("touchstart", handleUploadChange);
    };
  });

  const handleUploadChange = async ({ target: { files } }) => {
    setLoadingImage(true);
    const file = await files[0];
    if (file?.size < 300000) {
      const formData = new FormData();
      formData.append("files", file);
      const { data } = await uploadFile(formData);
      setContent((prev) => {
        return `${prev ? prev : ""}<img src="https://admin.jajoin.co${
          data[0].url
        }"/>`;
      });
      setLoadingImage(false);
    } else {
      const formData = new FormData();
      const format_file = await resizeFile(file);
      formData.append("files", format_file);
      const { data } = await uploadFile(formData);
      setContent((prev) => {
        return `${prev ? prev : ""}<img src="https://admin.jajoin.co${
          data[0].url
        }"/>`;
      });
      setLoadingImage(false);
    }
  };

  return editorLoaded ? (
    <div>
      <Wrapper>
        <div className="">{loadingImage && <p>Loading...</p>}</div>
        <CKEditor
          editor={ClassicEditor}
          config={configuration}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data);
          }}
        />
      </Wrapper>
      <input
        accept="image/jpeg,image/gif,image/png"
        className="hidden"
        id="wusiwyg-file"
        type="file"
        onChange={handleUploadChange}
      />
    </div>
  ) : (
    <div>Editor Loading</div>
  );
};

EditorTwo.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
};

export default EditorTwo;
