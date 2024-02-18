import React from "react";
import "./FilePicker.css";
function FilePicker({ text = "pick sth", onFilePick }) {
  return (
    <div className="FilePicker">
      <input type="file" name="file" id="file" onChange={onFilePick} />
      <label htmlFor="file">
        <span className="icon"></span>
        <span className="text">{text}</span>
      </label>
    </div>
  );
}

export default FilePicker;
