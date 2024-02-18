import React from "react";
import "./Images.css";
import FilePicker from "./FilePicker";
function Images({ images, setImages, srcs, setSrcs }) {
  const handleImagePick = (event) => {
    const files = event.target.files;
    if (files) {
      // * Adding image file to images array: 👇
      setImages([...images, files[0]]);
      // * Adding image file to images array 👆
      // * Adding image src to srcs array: 👇
      const fileReader = new FileReader();
      // TODO: I don't know what this fileReader.onload is, is it a promise? or sth else. I know for sure that it behaves like an async function.
      fileReader.onload = (event) => {
        setSrcs([...srcs, event.target.result]);
      };
      fileReader.readAsDataURL(files[0]);
      // * Adding image src to srcs array 👆
    }
  };
  const handleRemoveImage = (event) => {
    const newImages = images.filter((image, i) => i !== +event.target.id);
    setImages(newImages);
    const newSrcs = srcs.filter((src, i) => i !== +event.target.id);
    setSrcs(newSrcs);
  };
  return (
    <div className="Images">
      {srcs.map((src, index) => (
        <div className="image" key={src + index}>
          <img src={src} />
          <button
            className="remove"
            onClick={handleRemoveImage}
            id={index}
            type="button" //The default action of a button in a form element is to submit the form and as a result a ewload happens. So to prevent this, we must either use event.preventDefault() in click handler or specify the type attribute of "button".
          ></button>
        </div>
      ))}
      <FilePicker text="اضافه کردن عکس" onFilePick={handleImagePick} />
    </div>
  );
}

export default Images;
