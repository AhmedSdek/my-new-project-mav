import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { memo } from "react";

function CheckboxCom({ handleCheckboxChange, name, data }) {
  return (
    <FormGroup className="flex-row flex-wrap gap-2">
      {data.map((label) => (
        <FormControlLabel
          key={label}
          control={
            <Checkbox
              value={label}
              onChange={handleCheckboxChange}
              checked={name.includes(label)}
            />
          }
          label={label}
        />
      ))}
    </FormGroup>
  );
}

export default memo(CheckboxCom);
