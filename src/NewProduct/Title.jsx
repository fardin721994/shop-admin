import React from "react";
import "./title.css";
function Title({ title, setTitle }) {
  const handleTitleChange = (event) => setTitle(event.target.value);
  return (
    <div className="Title">
      <label htmlFor="title">عنوان</label>
      <input
        type="text"
        id="title"
        className="title"
        value={title}
        onChange={handleTitleChange}
      />
    </div>
  );
}

export default Title;
