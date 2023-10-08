import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const TypeSwitcher = ({ type, setType }) => {
  const handleTypeChange = () => {
    setType((prevType) => (prevType === "text" ? "bullets" : "text"));
  };

  return (
    <div className="flex items-center justi fy-center">
      <div className="w-80 p-3">
        <div className="flex items-center justify-center gap-3">
          <Typography id="type-switcher">Paragraphs</Typography>
          <Switch
            checked={type === "bullets"}
            onChange={handleTypeChange}
            color="primary"
            inputProps={{ "aria-label": "text or bullets switch" }}
          />
          <Typography id="type-switcher">Bullets Points</Typography>
        </div>
      </div>
    </div>
  );
};

export default TypeSwitcher;
