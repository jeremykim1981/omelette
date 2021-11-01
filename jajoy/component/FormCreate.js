import React, { useState, useCallback, useEffect, useRef } from "react";
import CelesTextFieldWithTitle from "../lib/TextFieldWithTitle";
import CelesSelect from "../lib/CelesSelect";
import TextArea from "../lib/TextArea";
import Cropper from "react-easy-crop";
// import CKEditor from "../component/CKEditor";

// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";
import { getCroppedImg } from "../utils/canvas";
import {
  readFile,
  resizeFile,
  resizeFileContent,
  resizeFileToBlob,
  uploadFile,
} from "../function/functions";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
// import {
//   align,
//   font,
//   fontColor,
//   fontSize,
//   formatBlock,
//   hiliteColor,
//   horizontalRule,
//   lineHeight,
//   list,
//   paragraphStyle,
//   table,
//   template,
//   textStyle,
//   image,
//   link,
// } from "suneditor/src/plugins";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const options = [
  { value: "BEAUTY", label: "Beauty" },
  { value: "CAFE", label: "Cafe" },
  { value: "FASHION", label: "Fashion" },
  { value: "TRAVEL", label: "Travel" },
  { value: "WITCHCRAFT", label: "Witchcraft" },
  { value: "OTHER", label: "Other" },
];

// Sentry.init({
//   dsn: "https://05fcf6537f774731b39230005a481082@o864679.ingest.sentry.io/5822474",
//   integrations: [new Integrations.BrowserTracing()],
// });

const FormCreate = ({
  create,
  setForm,
  form,
  setContent,
  content,
  setFile,
  file,
  croppedImage,
  setCroppedImage,
  setImage,
}) => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);

  const setField = useCallback(
    (field) => (e) => {
      const value = e && e.target ? e.target.value : e;
      setForm((currentForm) => ({
        ...currentForm,
        [field]: value,
      }));
    },
    [setForm]
  );

  const handleUploadChange = async ({ target: { files } }) => {
    setCroppedImage(null);
    const file = await files[0];
    setFile(file);
    if (file?.size < 500000) {
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    } else {
      const format_file = await resizeFile(file);
      let imageDataUrl = await readFile(format_file);
      setImageSrc(imageDataUrl);
    }
  };

  const onChangeCKEditor = (data) => {
    setContent(data);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const newCroppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(newCroppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleEditorChange = (content) => {};
  const editor = useRef();
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  // const handleImageUploadBefore = (files, info, uploadHandler) => {
  //   let response = {}
  //   request(api.upload(files[0])).then(img => {
  //     response = {
  //       result: [
  //         {
  //           url: img.location,
  //           name: img.originalName || 'Imagem',
  //           size: img.size
  //         }
  //       ]
  //     }

  //     uploadHandler(response)
  //   })
  // }

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    if (!files && files === null && files === undefined && files < 0) return;
    setLoading(true);
    const file = files[0];
    (async () => {
      if (file?.size < 300000) {
        const formData = new FormData();
        formData.append("files", file);
        const { data } = await uploadFile(formData);
        const response = {
          result: [
            {
              url: `https://admin.jajoin.co${data[0]?.url}`,
              name: data[0]?.name,
              size: data[0]?.size,
            },
          ],
        };
        await uploadHandler(response);
        setLoading(false);
      } else {
        const formData = new FormData();
        const format_file = await resizeFileContent(file);
        formData.append("files", format_file);
        const { data } = await uploadFile(formData);
        const response = {
          result: [
            {
              url: `https://admin.jajoin.co${data[0]?.url}`,
              name: data[0]?.name,
              size: data[0]?.size,
            },
          ],
        };
        await uploadHandler(response);
        setLoading(false);
      }
    })();
    uploadHandler();
  };

  return (
    <div className="text-center font-Times text-3xl text-textaboutus px-4 md:px-8 lg:px-16 max-w-screen-2xl mx-auto">
      <div>
        <div className="mb-4">
          <CelesTextFieldWithTitle
            classNameinbox=" lg:w-2/3 text-xl text-gray-700"
            placeholder="Title"
            name="title"
            setField={setField}
            value={form?.title}
          />
        </div>
        <div className="mb-4">
          <CelesSelect
            options={options}
            name="type"
            setField={setField}
            placeholder="Category"
            value={form?.type}
          />
        </div>
        <TextArea
          className=" font-Times my-4  text-center "
          label="Description"
          setField={setField}
          name="description"
          value={form?.description}
        />
        <div className=" font-Times my-4 text-center ">Cover image</div>
        {file || croppedImage ? (
          <div>
            {croppedImage ? (
              <div className="w-full lg:w-2/3 mx-auto text-2xl  border-dashed border border-textgray border-opacity-40  text-opacity-50 rounded">
                <label for="button-file" className="">
                  <img className="w-full text-2xl " src={croppedImage} />
                  <p className="font-Times text-sm">
                    (import image file .jpg ,.png )
                  </p>
                  <p className="font-Times text-sm">Recommended (1920x1080)</p>
                </label>
              </div>
            ) : (
              <div className="">
                {imageSrc !== null && (
                  <div className="relative w-full lg:w-2/3 h-cover mx-auto">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      aspect={5 / 3}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                    />
                  </div>
                )}
                <div>
                  <div className="w-full lg:w-2/3 mx-auto text-2xl  border-dashed h-20 border border-textgray border-opacity-40  text-opacity-50 rounded">
                    <label for="button-file" className="">
                      <p className="font-Times text-sm mt-5">
                        (import image file .jpg ,.png )
                      </p>
                      <p className="font-Times text-sm">
                        Recommended (1920x1080)
                      </p>
                    </label>
                  </div>
                </div>
                <div>
                  <button
                    className="mx-auto px-4 py-2 text-2xl mt-4 z-20 w-48 h-14 bg-brownnav rounded-md text-white"
                    onClick={showCroppedImage}
                  >
                    ยืนยันรูปภาพ
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full lg:w-2/3 mx-auto text-2xl  border-dashed h-20 border border-textgray border-opacity-40  text-opacity-50 rounded">
            <label for="button-file" className="">
              <p className="font-Times text-sm mt-5">
                (import image file .jpg ,.png )
              </p>
              <p className="font-Times text-sm">Recommended (1920x1080)</p>
            </label>
          </div>
        )}
        <div className="my-4 mt-8 " />
        <div className="w-full lg:w-2/3 mx-auto h-full">
          <SunEditor
            showToolbar={true}
            onChange={(event) => {
              setContent(event);
            }}
            setContents={content}
            setDefaultStyle="height: auto ;text-align:left"
            setOptions={{
              minHeight: 500,
              buttonList: [
                ["font", "fontSize", "align", "fontColor", "hiliteColor"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["horizontalRule", "list", "table"],
                ["image", "link"],
                ["undo", "redo"],
              ],
            }}
            onImageUploadBefore={handleImageUploadBefore}
          />
        </div>
      </div>
      <input
        accept="image/jpeg,image/gif,image/png"
        className="hidden"
        id="button-file"
        type="file"
        onChange={handleUploadChange}
        onLoad={loading}
      />
    </div>
  );
};
export default FormCreate;
