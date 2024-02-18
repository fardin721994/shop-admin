import React from "react";
import "./Description.css";
function Description({ description, setDescription }) {
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  return (
    <div className="Description">
      <div className="description">
        <label htmlFor="description">توضیح</label>
        <textarea
          type="textArea"
          id="description"
          className="description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
}

export default Description;
