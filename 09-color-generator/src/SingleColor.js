/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(",");
  const styles = {
    backgroundColor: `rgb(${bcg})`,
  };
  const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000)
    return () => clearTimeout(timeout)
  }, [alert])

  return (
    <article
      className={`color ${index > 10 && "color-light"}`}
      style={styles}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className="percen-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {alert && <p className="alert">copy to clipboard</p>}
    </article>
  );
};

export default SingleColor;
