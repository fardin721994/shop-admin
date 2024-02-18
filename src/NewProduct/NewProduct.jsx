import React, { useState } from "react";
import "./NewProduct.scss";
import Title from "./Title";
import Description from "./Description";
import Price from "./Price";
import Categories from "./Categories";
import Colors from "./Colors";
import Images from "./Images";
import Code from "./Code";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import Message from "./Message";
const initialData = {
  code: "",
  title: "",
  description: "",
  price: "",
  categories: [],
  colors: [],
  images: [],
};

////////
function NewProduct({ productData = initialData }) {
  // States: 👇
  const [code, setCode] = useState(productData.code);
  const [title, setTitle] = useState(productData.title);
  const [description, setDescription] = useState(productData.description);
  const [price, setPrice] = useState(productData.price);
  const [categories, setCategories] = useState(productData.categories);
  const [colors, setColors] = useState(productData.colors);
  const [images, setImages] = useState(productData.images);
  const [srcs, setSrcs] = useState([]); //? Why don't you use images state variable to derive srcs (to avoid defining the srcs state variable)? Answer: Because I can't loop over images array since fileReader.onload is sth like an async function (I don't know if it is a promise or not). I think there should be a way to do it but I didn't search enough to find it (if fileReader.onload is a promise, then using async-await is a solution)
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [message, setMessage] = useState("");

  // States 👆

  // handlers: 👇
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("code", code);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("categories", categories);
    formData.append("colors", colors);
    // * Multer currently does not support the array syntax, meaning we can't append an array of files like the comment below. It expects a series of files with the same field name,so I used a for loop to do that:👇
    // formData.append("images", images);
    for (let index = 0; index < images.length; index++) {
      formData.append("images", images[index]);
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              )
            );
          },
        }
      );

      setMessage("File Uploaded");
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
    }
  };
  // handlers 👆
  return (
    <>
      <form className="NewProduct" onSubmit={handleSubmit}>
        <Code code={code} setCode={setCode} />
        <Title title={title} setTitle={setTitle} />
        <Description
          description={description}
          setDescription={setDescription}
        />
        <Price price={price} setPrice={setPrice} />
        <Categories categories={categories} setCategories={setCategories} />
        <Colors colors={colors} setColors={setColors} />
        <Images
          images={images}
          setImages={setImages}
          srcs={srcs}
          setSrcs={setSrcs}
        />
        <input type="submit" value="ثبت اطلاعات" className="submit-btn" />
      </form>
      <ProgressBar percentage={uploadPercentage} />
      {message ? <Message msg={message} /> : null}
    </>
  );
}

export default NewProduct;
