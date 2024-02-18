import React from "react";
import "./ProgressBar.scss";
const ProgressBar = ({ percentage }) => {
  return (
    <div className="ProgressBar">
      <div className="bar" style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressBar;
