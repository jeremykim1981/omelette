// import React, { useState, useCallback, useEffect, useRef } from "react";

// const initialState = {
//   isLoading: false,
//   imageName: "",
//   imagePreview: null,
//   imageSize: 0,
// };

const CelesUploadFile = ({ className = "bg-gray-600 w-20 h-10", setImage }) => {
  /////////////////////////////////////////////////////////////////////////////

  //   const [state, setState] = useState(initialState);
  //   const uploadInputEl = useRef(null);

  const handleUploadChange = async ({ target: { files } }) => {
    // setState((prevState) => ({ ...prevState, isLoading: true }));

    const file = files[0];
    setImage(file);
    // await new Promise((res) => {
    //   setTimeout(() => {
    //     res(
    //       setState((prevState) => ({
    //         ...prevState,
    //         imageName: file.name,
    //         imagePreview: URL.createObjectURL(file),
    //         imageSize: file.size,
    //         isLoading: false,
    //       }))
    //     );
    //   }, 2000);
    // });
  };

  //   const resetUpload = () => {
  //     setState(initialState);
  //     uploadInputEl.current.value = null;
  //   };

  //   const uploadImage = async () => {
  //     if (state.imagePreview)
  //       setState((prevState) => ({ ...prevState, isLoading: true }));

  //     await new Promise((res) => {
  //       setTimeout(() => {
  //         res(alert(JSON.stringify(state, null, 4)));
  //         resetUpload();
  //       }, 2000);
  //     });
  //   };

  //   const { imagePreview, imageName, imageSize, isLoading } = state;

  /////////////////////////////////////////////////////////////////////////////

  return (
    <label for="button-file" className={className}>
      Custom Upload
      <input
        accept="image/jpeg,image/gif,image/png"
        className="hidden"
        id="button-file"
        type="file"
        // ref={uploadInputEl}
        onChange={handleUploadChange}
      />
    </label>
  );
};
export default CelesUploadFile;
