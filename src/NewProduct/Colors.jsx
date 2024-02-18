import React, { useState } from "react";
import "./Colors.scss";
function Colors({ colors, setColors }) {
  const [value, setValue] = useState("#FFFFFF");
  const handleColorChange = (event) => {
    setValue(event.target.value);
  };
  const handleColorAddition = (event) => {
    setColors([...colors, value]);
  };
  const handleRemoveColor = (event) => {
    const newColors = colors.filter((color) => color !== event.target.id);
    setColors(newColors);
  };
  return (
    <div className="Colors">
      <label htmlFor="colorInput">انتخاب رنگ</label>
      <div className="input-tick">
        <input
          type="color"
          id="colorInput"
          value={value}
          onChange={handleColorChange}
        />
        <button onClick={handleColorAddition} type="button">
          ✔
        </button>
      </div>
      <ul>
        {colors.map((color) => (
          <li className="picked" key={color}>
            <span style={{ backgroundColor: color }}></span>
            <button className="remove" onClick={handleRemoveColor} id={color}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Colors;
