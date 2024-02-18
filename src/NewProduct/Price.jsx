import React from "react";
import "./Price.css";
function Price({ price, setPrice }) {
  const handlePriceChange = (event) => setPrice(event.target.value);
  return (
    <div className="Price">
      <label htmlFor="price">قیمت</label>
      <input
        type="number"
        id="price"
        className="price"
        value={price}
        onChange={handlePriceChange}
      />
    </div>
  );
}

export default Price;
