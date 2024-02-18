import React from "react";
import "./Code.css";
function Code({ code, setCode }) {
  const handleCodeChange = (event) => setCode(event.target.value);
  return (
    <div className="Code">
      <label htmlFor="Code">کد محصول</label>
      <input
        type="text"
        id="Code"
        className="Code"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
}

export default Code;
